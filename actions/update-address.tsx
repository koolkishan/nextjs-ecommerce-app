"use server";
import {
  addAddress,
  findAddressByUserId,
  updateAddressById,
} from "@/data-access/address";
import { findUserById } from "@/data-access/user";
import { updateAddressSchema } from "@/schemas";
import { z } from "zod";

export const updateUserAddress = async (
  values: z.infer<typeof updateAddressSchema>,
  userId: string
) => {
  const validation = updateAddressSchema.safeParse(values) as any;
  console.log("🚀 ~ validation:----", validation);

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const validatedData = validation.data;

  try {
    const userExistOrNot = await findUserById(userId);

    if (!userExistOrNot) {
      return { error: "User Not Found!" };
    }

    const userAddress = await findAddressByUserId(userId);
    console.log("🚀 ~ userAddress:", userAddress);
    console.log("🚀 ~ userId:", userId);
    if (!userAddress) {
      await addAddress(validatedData, userId);
      return { success: "Address Added Successfully!" };
    } else {
      await updateAddressById(userAddress.id, validatedData, userId);
      return { success: "Address Updated Successfully!" };
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
