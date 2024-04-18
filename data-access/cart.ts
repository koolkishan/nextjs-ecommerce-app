import { db } from "@/lib/db";

export const addToCart = async ({
  productId,
  userId,
}: {
  productId: number[];
  userId: string;
}) => {
  await db.cart.create({
    data: {
      productId: productId,
      userId,
    },
  });
};

export const getCartItemByUserId = async ({ userId }: { userId: string }) => {
  return await db.cart.findFirst({
    where: {
      userId,
    },
  });
};

export const getAllCartItems = async ({ userId }: { userId: string }) => {
  return await db.cart.findFirst({
    where: {
      userId,
    },
  });
};

export const updateCartProductInDb = async ({
  productId,
  userId,
}: {
  productId: number[];
  userId: string;
}) => {
  return await db.cart.update({
    where: {
      userId,
    },
    data: {
      productId: productId,
    },
  });
};
// export const removeCartProductFromDb = async ({
//   productId,
//   userId,
// }: {
//   productId: number;
//   userId: string;
// }) => {
//   return await db.cart.delete({
//     where: {
//       userId,
//     },
//   })
// };
