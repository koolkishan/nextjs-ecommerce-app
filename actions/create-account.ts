"use server";

import {  findUserByEmail } from "@/data-access/user"
import { createAccountSchema } from "@/schemas";
import { z } from "zod";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const createAccount = async (values: z.infer<typeof createAccountSchema>) => {
  const validation = createAccountSchema.safeParse(values) as any;

  if (!validation.success) {
    return { success: "Invalid Fields!" };
  }
  const { email } = validation.data;

  try {
    const userExistOrNot = await findUserByEmail(email);
  
    if (userExistOrNot) {
      return { error: "Email already in use!" };
    }
  
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
  
    return {success: 'Verification token send successfully.', data: {verificationToken}};
  
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to verify user.",
      };
    }
  }
};
