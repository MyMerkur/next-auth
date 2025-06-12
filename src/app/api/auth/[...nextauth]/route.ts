import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const namespace = "https://nextApp.com/role"; 
        token.role = (profile as any)[namespace] || "user";
      }
      return token;
    },
    async session({ session, token }) {
  if (token && session.user) {
    session.user.role = token.role as string | null | undefined;
  }
  return session;
},
  },
});

export { handler as GET, handler as POST };
