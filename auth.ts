import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { findUserById } from "./data-access/user";
import authConfig from "./auth.config";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    callbacks: {
      async session({ token, user, session }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        return session;
      },
      async jwt({ token }) {
        if (!token.sub) return token;
        const existingUser = await findUserById(token.sub);
        if (!existingUser) return token;
        token.user = existingUser;
        return token;

      },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
  });
  