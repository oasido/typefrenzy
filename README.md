# TypeFrenzy ⌨️

TypeFrenzy is a typing game created with Next.js.

## Features

**Easy way to login:**

Use Facebook, GitHub or your using credentials to login.
TypeFrenzy utilizes Next-Auth with the aforementioned providers.

I chose to use Supabase for this project, make sure you have the proper Supabase connection credentials in `.env.local`

Go to [Environment Variables](#Environment-Variables) to see what else you need in `.env.local`

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=

## Showcase

[![Watch the video](https://img.youtube.com/vi/roPiInOeO50/maxresdefault.jpg)](https://youtu.be/roPiInOeO50)
[Click here or the picture to open in YouTube](https://youtu.be/roPiInOeO50)

## Usage

### **Environment Variables**

Create the `.env.local` file in the root directory & fill them accordingly:

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=

    NEXTAUTH_URL=
    NEXTAUTH_SECRET=

    FACEBOOK_CLIENT_ID=
    FACEBOOK_CLIENT_SECRET=

    GITHUB_ID=
    GITHUB_SECRET=

If you're not familiar with Supabase, [click here](https://supabase.com).

## Docker

(WIP)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
