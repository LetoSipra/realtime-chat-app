import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_WEB_CLIENT_ID,
      clientSecret: process.env.GOOGLE_WEB_CLIENT_SECRET,
      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.uid = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
