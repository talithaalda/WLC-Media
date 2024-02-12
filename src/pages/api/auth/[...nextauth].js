// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail } from "../../../utils/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET_KEY,
  providers: [
    credentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Check if the user exists
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            return Promise.reject({ error: "User not found" });
          }
          // Verify the password
          const isValidPassword = await compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            return Promise.reject({ error: "Invalid password" });
          }

          // Return user object on successful authentication
          return Promise.resolve(user);
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve({ error: "Internal Server Error" });
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/logout",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return Promise.resolve(token);
    },
    async signIn(user, account, profile) {
      console.log("User signed in:", user);
      return true; // Redirect to the original URL after successful sign-in
    },
    session: async (session, token) => {
      session.user = token;
      return Promise.resolve(session);
    },
  },
});
