import NextAuth from "next-auth";

import authConfig from "./auth.config";

import { connectDB } from "@/lib/mongodb";
import { User, UserRole } from "@/models/User";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      let dbUser = await User.findOne({
        email: user.email,
      });

      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: UserRole.RECRUITER,
        });
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      await connectDB();

      const dbUser = await User.findOne({
        email: token.email,
      });

      if (!dbUser) {
        return token;
      }

      token.id = dbUser._id.toString();
      token.role = dbUser.role;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
});