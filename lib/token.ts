import { getVerificationTokenByEmail } from "@/data-access/verification-token";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getVerificationTokenByEmail(email);
  
    if (existingToken) {
      await db.verificationToken.delete({
        where: { id: existingToken.id },
      });
    }
  
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        expirationTime,
        token,
      },
    });
  
    return verificationToken;
  };