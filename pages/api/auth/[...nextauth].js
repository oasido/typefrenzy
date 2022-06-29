import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { supabase } from '../../../utils/supabaseClient';
import { generateFromEmail } from 'unique-username-generator';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // check if user is actually using credentials as provider

        const userSearch = await supabase
          .from('users')
          .select()
          .eq('username', credentials.username);

        if (userSearch.body.length > 0 && userSearch.body[0].provider === 'credentials') {
          // Any object returned will be saved in `user` property of the JWT
          const { username: name, email } = userSearch.body[0];
          const user = userSearch.body[0];
          delete user.password;
          console.log(user);
          return user;
          // return { id: 1, name, email };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
  // debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        const { name: full_name, email, avatar_url: avatar, login: username } = profile;

        // check if account exists
        // if not, register account in our own db

        const emailSearch = await supabase.from('users').select().eq('email', email);

        if (emailSearch.body?.length === 0) {
          // if account isn't already registered
          const { error } = await supabase
            .from('users')
            .insert([{ username, email, full_name, provider: 'github', avatar }]);

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
        console.log(profile);
        const { name: full_name, email, image: avatar } = user;

        const emailSearch = await supabase.from('users').select().eq('email', email);

        if (emailSearch.body?.length === 0) {
          const username = generateFromEmail(email);
          const { error } = await supabase
            .from('users')
            .insert([{ username, email, full_name, provider: 'facebook', avatar }]);

          if (error) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
      return true;
    },

    // propogate more props in the session object
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id, created_at, username, email, provider, avatar, full_name } = token;
        session = { ...session, id, created_at, username, email, provider, avatar, full_name };
      }
      return session;
    },
  },
});
