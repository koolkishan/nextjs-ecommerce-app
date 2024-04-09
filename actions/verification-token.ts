"use server";

import * as z from "zod";

import { ConfirmEmailSchema } from "@/schemas";
import { deleteVerificationTokenById, getVerificationTokenByEmail } from "@/data-access/verification-token";
import { createUser } from "@/data-access/user";

export const verificationAction = async (
  values: z.infer<typeof ConfirmEmailSchema>,
  email: string,
  islogin = false,
) => {
  const validatedFields = ConfirmEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { pin } = validatedFields.data;

  try {
    const existingToken = await getVerificationTokenByEmail(email);

    if (!existingToken) return { error: "Token does not exist!" };

    const hasExpired = new Date(existingToken.expirationTime) < new Date();

    if (hasExpired) {
      return { error: "Token has been expired!" };
    }

    if (existingToken.token === pin) {
      await deleteVerificationTokenById({id: existingToken.id});

      await createUser(email)

     if(!islogin) {
      return {
        success: "User is successfully verified! Please login.",
      };
     }
     return {
      success: "User is successfully verified",
    };
    } else {
      return {
        error: "Entered PIN is invalid!",
      };
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
        error: "Failed to verify user",
      };
    }
  }
};
