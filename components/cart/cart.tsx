"use client";
import { useAppStore } from "@/store";
import Image from "next/image";
import { StarRating } from "../rating-stars";
import { IndianRupee } from "lucide-react";
import { Button } from "../ui/button";

const Cart = () => {
  // Access the cart products from your store
  const { addToCartProduct } = useAppStore();

  return (
    <div className="h-full w-full">
      <div className="py-6 w-full">
        <p className="font-bold text-[20px]">YOUR CART</p>
      </div>
      <div className="flex">
        {
          // If there are products in the cart
          addToCartProduct && addToCartProduct.length > 0 ? (
            <div className="flex flex-wrap w-[70%] py-4">
              {addToCartProduct.map((product, index) => (
                <div className=" bg-white ">
                  <div key={index} className="flex w-full px-4">
                    <div className="mr-4">
                      <Image
                        src="/deals-of-the-day/dealsOfTheDay1.png"
                        alt={product.name}
                        width={300}
                        height={350}
                      />
                    </div>
                    <div className="flex flex-col mr-10">
                      <p className="font-medium text-xl">{product.name}</p>
                      <p className="text-custom-gray my-4">
                        <StarRating rating={product.rate} />
                      </p>
                      <div className="mt-2">
                        <Button className="bg-transparent hover:bg-transparent border border-black px-10 text-primary-dark font-bold ">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex flex-col items-end border-b  border-black">
                        <p className="text-2xl font-bold">
                          <span className="">₹</span>
                          {Number(product.discountedPrice).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                        <p className="text-xl mb-2">{`(Inc. all Taxes)`}</p>
                      </div>
                      <div>
                        <p className="text-xl text-end mt-2 line-through">
                          <span>MRP</span>{" "}
                          <IndianRupee className="inline line-through" />
                          {Number(product.price).toLocaleString("en-IN")}
                        </p>
                        <p className="text-end text-[14px] text-custom-gray">{`Save (₹${+product.price - +product.discountedPrice})`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-[70%]">
              <p>No products in the cart.</p>
            </div>
          )
        }
        {addToCartProduct && addToCartProduct.length > 0 ? (
          <div className="w-[30%] flex flex-col justify-start bg-white ml-4 mt-4 p-3">
            <p className="text-2xl font-bold">{`Order Summary ( ${addToCartProduct.length} items )`}</p>
            <div className="flex w-full justify-center items-center">
              <div className="flex flex-col justify-center items-start w-1/2 text-xl mt-4">
                <p className="mb-3">Original Price</p>
                <p className="mb-3">Saving</p>
                <p className="mb-3">Total</p>
              </div>
              <div className="flex flex-col justify-center items-end w-1/2 text-xl mt-4">
                {/* Calculate Original Price */}
                <p className="mb-3">
                  <IndianRupee className="inline" />
                  {addToCartProduct
                    .reduce((total, product) => total + product.price, 0)
                    .toLocaleString("en-IN")}
                </p>

                {/* Calculate Saving */}
                <p className="mb-3">
                  -<IndianRupee className="inline" />
                  {addToCartProduct
                    .reduce(
                      (total, product) =>
                        total + (product.price - product.discountedPrice),
                      0
                    )
                    .toLocaleString("en-IN")}
                </p>

                {/* Calculate Total */}
                <p className="mb-3">
                  <IndianRupee className="inline" />
                  {addToCartProduct
                    .reduce(
                      (total, product) => total + product.discountedPrice,
                      0
                    )
                    .toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            {/* Add more total price calculation and display logic as needed */}
            <Button className="bg-custom-btn text-lg font-medium hover:bg-custom-btn text-primary-dark py-2">
              {" "}
              Checkout{" "}
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
