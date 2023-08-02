import 'styles/globals.css';
import { AppProps } from 'next/app';
import { UserWrapper } from '../context/user';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { NotificationWrapper } from '../context/notification';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <NotificationWrapper>
        <Head>
          <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="robots" content="index,follow" />
          <meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
          <meta property="og:description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        </Head>
        <UserWrapper>
          <main className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col justify-start relative">
            <Component {...pageProps} />
          </main>
        </UserWrapper>
      </NotificationWrapper>
    </SessionProvider>
  );
}
