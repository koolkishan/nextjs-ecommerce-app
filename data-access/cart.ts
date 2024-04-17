import { db } from "@/lib/db";

// export const addToCart = async ({
//   productId,
//   userId,
// }: {
//   productId: number;
//   userId: string;
// }) => {
//   await db.cart.create({
//     data: {
//       productId : productId,
//       userId,
//     },
//   });
// };

// export const getCartItemByProductId = async ({
//   productId,
// }: {
//   productId: number;
// }) => {
//   return await db.cart.findFirst({
//     where: {
//       productId,
//     },
//   });
// };

// export const getAllCartItems = async ({ userId }: { userId: string }) => {
//   return await db.cart.findMany({
//     where: {
//       userId,
//     },
//   });
// };

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
