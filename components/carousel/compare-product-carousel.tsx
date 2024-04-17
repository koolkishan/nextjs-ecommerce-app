"use client";
import { useAppStore } from "@/store";
import { MultipleProductCarousel } from ".";
import Image from "next/image";
import { X } from "lucide-react";
import { StarRating } from "../rating-stars";
import { ProductTypes } from "@/types";

const CompareProductCarousel = () => {
  const { compareProduct, setCompareProduct } = useAppStore();
  const handleRemove = (product: ProductTypes) => {
    const newProduct = compareProduct.filter((p) => p.id !== product.id);
    setCompareProduct(newProduct);
  };
  return (
    <div className="px-6 text-primary-white lg:container lg:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3 mt-8">
      {compareProduct &&
        compareProduct.map((product, index) => {
          return (
            <div key={index}>
              <div className="bg-black/25 rounded-xl">
                <div className="pb-1">
                  <div className="flex justify-end mt-4 mr-4">
                    <X onClick={() => handleRemove(product)} size={30} />
                  </div>
                  <div className="flex justify-center items-center">
                    <Image
                      src="/deals-of-the-day/dealsOfTheDay1.png"
                      alt="singleproduct"
                      width={300}
                      height={300}
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
                  </div>
                  <div className="mx-4 my-8">
                    <p className="text-xl font-medium  line-clamp-3">
                      {product.name}
                    </p>
                    <div className="flex items-center">
                      <p className="text-xl font-medium my-4">
                        ₹
                        {Number(product.discountedPrice).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                      <p className="text-sm font-medium my-4 line-through text-primary-gray">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                      <p className="mx-4">
                        {(
                          100 -
                          (product.discountedPrice * 100) / product.price
                        ).toFixed(2)}
                        %off
                      </p>
                    </div>
                    <p className="text-primary-gray">
                      <StarRating rating={product.rate} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-l border-primary-txt p-4">
                <p className="text-xl font-bold my-2">Key Features</p>
                {product?.keyFeatures?.map((feat, index) => (
                  <div key={index}>
                    <li>{feat}</li>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CompareProductCarousel;
