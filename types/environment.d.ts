namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXTAUTH_SECRET: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
  }
}
