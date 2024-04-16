"use server";
import { findUserByEmail, updateUserByEmail } from "@/data-access/user";
import { updateProfileSchema } from "@/schemas";
import { z } from "zod";

export const updateUserDetails = async (
  values: z.infer<typeof updateProfileSchema>,
  email: string
) => {
  const validation = updateProfileSchema.safeParse(values) as any;

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const { fName, mName, lName, gender, emailid, title } = validation.data;

  try {
    const userExistOrNot = await findUserByEmail(email);

    if (!userExistOrNot) {
      return { error: "User Not Found!" };
    }

    const user = await updateUserByEmail({
      title,
      firstName: fName,
      middleName: mName,
      lastName: lName,
      gender: gender,
      email: emailid,
    });
    return {
      success: "update user successfully.",
    };
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