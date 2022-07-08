import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { supabase } from '../../../utils/supabaseClient';
import { generateFromEmail, generateUsername } from 'unique-username-generator';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        // check if user is actually using credentials as provider
        const { username, password } = { ...credentials };

        interface UserSearch {
          id: number;
          created_at: string;
          username: string;
          password?: string;
          email: string;
          provider: 'credentials' | 'github' | 'facebook';
          avatar: string | null;
          full_name: string | null;
          [key: string]: any;
        }

        const { data }: any = await supabase.from('users').select().eq('username', username);
        const user: UserSearch = data[0];

        if (user && user.provider === 'credentials') {
          const checkUser = async (hash: any, givenPassword: any): Promise<any> => {
            const match: boolean = await bcrypt.compare(hash, givenPassword);

            if (match) {
              delete user.password;
              return user;
            } else {
              return null;
            }
          };
          return checkUser(password, user.password);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        const { name: full_name, email, avatar_url: avatar, login: username } = profile;

        // check if account exists
        // if not, register account in our own db

        const emailSearch = await supabase.from('users').select().eq('email', email);

        if (emailSearch.body?.length === 0) {
          // if account isn't already registered
          const { error } = await supabase.from('users').insert([
            {
              username,
              email,
              full_name,
              provider: 'github',
              avatar,
              provider_account_id: account.providerAccountId,
            },
          ]);

          if (error) {
            return false;
          } else {
            return true;
          }
        } else {
          return true; // if account is already registered
        }
      }

      if (account.provider === 'facebook') {
        const { name: full_name, email, image: avatar } = user;

        const emailSearch = await supabase.from('users').select().eq('email', email);

        if (emailSearch.body?.length === 0) {
          const username = generateFromEmail(email ?? generateUsername());
          const { error } = await supabase.from('users').insert([
            {
              username,
              email,
              full_name,
              provider: 'facebook',
              avatar,
              provider_account_id: account.providerAccountId,
            },
          ]);

          if (error) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }

      if (account.provider === 'credentials') {
        return true;
      }
      return false;
    },

    // propogate more props in the session object

    async jwt({ token, user, account }) {
      if (user) {
        const providerAccountId: Readonly<string | undefined> = account?.providerAccountId;
        token = { ...token, ...user, providerAccountId };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { email, id } = token;
        const { data }: any = await supabase.from('users').select().eq('email', email);
        const { username, avatar } = data[0];
        const uid: number = data[0].id;
        session = {
          ...session,
          id,
          uid,
          user: {
            name: username as string,
            email,
            image: avatar as string | null,
          },
        };
      }
      return session;
    },
  },
});
