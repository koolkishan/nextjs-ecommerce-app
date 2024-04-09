"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const resendOtp = async (email: string) => {
    try {
        if (email) {
            const verificationToken = await generateVerificationToken(email);
            await sendVerificationEmail(
              verificationToken.email,
              verificationToken.token,
            );
            return {success: 'Verification token send successfully.', data: {verificationToken}};
          }
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
