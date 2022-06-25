import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
