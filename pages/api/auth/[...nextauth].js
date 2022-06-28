import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { supabase } from '../../../utils/supabaseClient';
import { generateFromEmail, generateUsername } from 'unique-username-generator';

export default NextAuth({
  providers: [
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
  },
});
