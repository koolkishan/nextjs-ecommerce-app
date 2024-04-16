'use server';
import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const deleteVerificationTokenById = async ({ id }: { id: string }) => {
  try {
    await db.verificationToken.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};
