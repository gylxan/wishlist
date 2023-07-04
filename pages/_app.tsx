import 'styles/globals.css';
import { AppProps } from 'next/app';
import { UserWrapper } from '../context/user';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <UserWrapper>
        <main className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col justify-start p-4">
          <Component {...pageProps} />
        </main>
      </UserWrapper>
    </>
  );
}
