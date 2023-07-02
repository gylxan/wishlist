import 'styles/globals.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col justify-start p-4">
      <Component {...pageProps} />
    </div>
  );
}
