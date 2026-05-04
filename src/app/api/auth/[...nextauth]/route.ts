import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded admin for simplicity in this MVP
        // You should move these to .env later
        if (credentials?.username === "admin" && credentials?.password === "chiltepin2026") {
          return { id: "1", name: "Admin El Chiltepín", email: "admin@elchiltepin.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
