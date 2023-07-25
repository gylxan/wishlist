import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
          throw new Error('Unültige E-Mailadresse oder falsches Passwort');
        }
        return { username: 'admin', email };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.warn(user)
      if (user) {
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.accessToken = token.accessToken;
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
