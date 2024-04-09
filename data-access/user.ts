import { db } from "@/lib/db";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
};

export const findUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
};

export const createUser = async (email: string) => {
  try {
    await db.user.create({
      data: {
        email,
      },
    });
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
};

export const updateUserById = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  try {
    await db.user.update({
      where: { id },
      data: {
        emailVerified: new Date(),
        email,
      },
    });
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
};
