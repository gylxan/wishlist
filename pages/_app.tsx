import 'styles/globals.css';
import { AppProps } from 'next/app';
import { UserWrapper } from '../context/user';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserWrapper>
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col justify-start p-4">
        <Component {...pageProps} />
      </div>
    </UserWrapper>
  );
}
