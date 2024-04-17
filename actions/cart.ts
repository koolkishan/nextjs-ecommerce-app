"use server";
import {
  addToCart,
  getAllCartItems,
  getCartItemByProductId,
  removeCartProductFromDb,
} from "@/data-access/cart";

export const addCartProductInDb = async ({
  productId,
  userId,
}: {
  productId: number;
  userId: string;
}) => {
  try {
    const itemExistInCart = await getCartItemByProductId({ productId });
    if (!itemExistInCart) {
      await addToCart({ productId, userId });
    }
  } catch (error) {
    console.log("Error while adding product to cart", error);
  }
};

export const getAllProductFromCart = async ({ userId }: { userId: string }) => {
  try {
    console.log("🚀 ~ getAllProductFromCart ~ userId:", userId);
    return await getAllCartItems({ userId });
  } catch (error) {
    console.log('Error while getting all products from cart', error);
    
  }
};

export const removeProductFromCart = async ({productId, userId}:{productId:number, userId:string}) => {
    try {
        return await removeCartProductFromDb({productId, userId});
    } catch (error) {   
        console.log('Error removing product from cart', error);
        
    }
}