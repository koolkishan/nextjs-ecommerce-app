import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas";
import { findUserByEmail } from "./data-access/user";

export default {
    providers: [
      Credentials({
        async authorize(credentials) {
          const validatedFields = loginSchema.safeParse(credentials);
  
          if (validatedFields.success) {
            const { email } = validatedFields.data;
  
            const user = await findUserByEmail(email);
            return user;
          }
          return null;
        },
      }),
    ],
  } satisfies NextAuthConfig;
