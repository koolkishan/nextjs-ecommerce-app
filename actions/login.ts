"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  value: z.infer<typeof loginSchema>,
) => {
  const validation = loginSchema.safeParse(value) as any;
  const { email } = validation.data;

  try {
    await signIn("credentials", {
      email,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login successfull" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
