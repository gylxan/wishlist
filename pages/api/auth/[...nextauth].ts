import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

type User = { email?: string | undefined | null };
type ExtendedSession = Session & { user: User };
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        email: { label: 'E-Mail', type: 'email' },
        password: { label: 'Passwort', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Keine Zugangsdaten');
        }
        const { email, password } = credentials;

        const everythingCorrect =
          email === process.env.NEXT_ADMIN_MAIL &&
          password === process.env.NEXT_ADMIN_PASSWORD;

        if (!everythingCorrect) {
          throw new Error('Ungültige E-Mailadresse oder falsches Passwort');
        }
        return { username: 'admin', email, id: '1' };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.email = user.email;
      }

      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }): Session => {
      if (token) {
        (session as ExtendedSession).user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
export default NextAuth(authOptions);
