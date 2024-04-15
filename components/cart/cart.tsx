"use client";

import { useAppStore } from "@/store";
import Image from "next/image";
import { StarRating } from "../rating-stars";
import { IndianRupee } from "lucide-react";
import { Button } from "../ui/button";

const Cart = () => {
  // Access the cart products from your store
  const { addToCartProduct } = useAppStore();

  // Check if cart is empty
  const isCartEmpty = !addToCartProduct || addToCartProduct.length === 0;

  // Determine the layout for order summary based on screen size
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const isLargeScreen = screenWidth >= 768; // Adjust the value if needed

  return (
    <div className="w-full h-full lg:container px-6 lg:px-0">
      {/* Heading */}
      {!isCartEmpty && (
        <div className="py-6 w-full">
          <p className="font-bold text-[20px]">YOUR CART</p>
        </div>
      )}

      {isCartEmpty ? (
        // If cart is empty, render empty cart view
        <div className="w-full h-[500px] flex flex-col items-center justify-center">
          <Image
            src="/cart_empty.png"
            alt="Cart Empty"
            width={400}
            height={400}
          />
          <p className="text-xl font-bold">Cart is empty</p>
        </div>
      ) : (
        // If cart has items, render cart products and order summary
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart products */}
          <div className="md:col-span-2">
            {addToCartProduct.map((product, index) => (
              <div key={index} className="mb-6">
                {/* Product details */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {/* Product image */}
                  <div className="w-[170px] h-[170px] md:col-span-1">
                    <Image
                      src="/deals-of-the-day/dealsOfTheDay1.png"
                      alt={product.name}
                      width={300}
                      height={350}
                    />
                  </div>

                  {/* Product details */}
                  <div className="md:col-span-4 md:pl-10">
                    {/* Product name */}
                    <p className="font-medium text-base line-clamp-2 md:text-xl">
                      {product.name}
                    </p>

                    {/* Product rating */}
                    <p className="text-primary-gray my-2">
                      <StarRating rating={product.rate} />
                    </p>

                    {/* Price details (small screen) */}
                    <div className="block md:hidden">
                      <div className="flex flex-col md:items-end md:border-b border-black">
                        <p className="font-bold">
                          <span>₹</span>
                          {product.discountedPrice.toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm mt-[-5px]">(Inc. all taxes)</p>
                      </div>

                      {/* Savings details */}
                      <div className="flex gap-1 my-2">
                        <p className="line-through text-sm">
                          <span>MRP ₹</span>
                          {product.price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-13 text-primary-gray">{`(Save ₹${(product.price - product.discountedPrice).toLocaleString("en-IN")})`}</p>
                      </div>
                    </div>

                    {/* Remove button */}
                    <Button
                      className="bg-transparent hover:bg-transparent border border-black px-10 text-primary-dark font-bold"
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Price details (large screen) */}
                  <div className="hidden md:block md:col-span-1 md:mx-2">
                    {/* Discounted price */}
                    <div className="flex flex-col md:items-end">
                      <p className="md:text-2xl font-bold">
                        <span>₹</span>
                        {product.discountedPrice.toLocaleString("en-IN")}
                      </p>
                      <p className="md:text-sm mb-2">(Inc. all taxes)</p>
                    </div>

                    {/* Original price */}
                    <div className="w-28 border-primary-dark ml-2 float-right border-b-[1px]"></div>
                    <div>
                      <p className="md:text-xl md:text-end mt-2 line-through">
                        <span>MRP ₹</span>
                        {product.price.toLocaleString("en-IN")}
                      </p>
                      <p className="md:text-end text-14 text-primary-gray">{`Save (₹${(product.price - product.discountedPrice).toLocaleString("en-IN")})`}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order details */}
          {/* Conditionally render order summary either to the right side of the cart products (large screens) or at the bottom (small screens) */}
          <div className={isLargeScreen ? "md:col-span-1" : "w-full col-span-2 p-2 bg-white"}>
            <div className="text-xl font-bold">
              <p>Order Summary ({addToCartProduct.length} items)</p>
            </div>

            {/* Price and saving calculations */}
            <div className="grid grid-cols-2 w-full">
              <div>
                <p className="mt-4">Original Price</p>
                <p className="my-4">Saving</p>
                <p className="my-4">Total</p>
              </div>
              <div className="text-end">
                {/* Calculate Original Price */}
                <p className="mt-4">
                  <IndianRupee className="inline" />
                  {addToCartProduct
                    .reduce((total, product) => total + product.price, 0)
                    .toLocaleString("en-IN")}
                </p>

                {/* Calculate Saving */}
                <p className="my-4">
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
                <p className="my-3">
                  <IndianRupee className="inline" />
                  {addToCartProduct
                    .reduce((total, product) => total + product.discountedPrice, 0)
                    .toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Checkout button */}
            <Button className="w-full bg-primary-btn text-lg font-medium hover:bg-primary-btn text-primary-dark py-2">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
