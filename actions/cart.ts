"use server";
import {
  addToCart,
  getAllCartItems,
  getCartItemByUserId,
  updateCartProductInDb,
  // removeCartProductFromDb,
} from "@/data-access/cart";

export const addCartProductInDb = async ({
  productId,
  userId,
}: {
  productId: number[];
  userId: string;
}) => {
  try {
    const itemExistInCart = await getCartItemByUserId({ userId });
    if (!itemExistInCart?.productId.includes(productId[0])) {
      await addToCart({ productId, userId });
    }
  } catch (error) {
    console.log("Error while adding product to cart", error);
  }
};

export const getAllProductFromCart = async ({ userId }: { userId: string }) => {
  try {
    return await getAllCartItems({ userId });
  } catch (error) {
    console.log('Error while getting all products from cart', error);
  }
};

export const updateProduct = async ({
  productId,
  userId,
}: {
  productId: number[];
  userId: string;
}) => {
  try {
    return await updateCartProductInDb({
      productId,
      userId,
    })
  } catch (error) {
    console.log('Error while updating all product from cart', error);
  }
}
// export const removeProductFromCart = async ({productId, userId}:{productId:number, userId:string}) => {
//     try {
//         return await removeCartProductFromDb({productId, userId});
//     } catch (error) {   
//         console.log('Error removing product from cart', error);
        
//     }
// }