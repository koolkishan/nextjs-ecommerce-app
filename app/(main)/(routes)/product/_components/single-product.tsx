"use client";

import { StarRating } from "@/components/rating-stars";
import { getProductFromId } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface SingleProductProps {
  productId: string;
}
const SingleProduct = ({ productId }: SingleProductProps) => {
  const product = getProductFromId(productId.split("%")[0]);
  console.log(product, "product");
  return (
    <div className="flex w-full px-6 lg:container lg:px-0 mt-4">
      <div className="relative w-1/2 mr-5">
        <div className="absolute text-red-400 flex justify-end w-full lg:ml-[-50px] ">
          <FaHeart size={22} />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/deals-of-the-day/dealsOfTheDay1.png"
            alt="singleproduct"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-xl">{product?.name}</h1>
        {/* <StarRating rating={product ? product.rate : 0} /> */}
        <p className="flex w-10 justify-center items-center text-sm my-2 rounded-md bg-custom-btn font-bold ">
          <p className="text-primary-txt mt-[2px] ml-1">{product?.rate}</p>
          <p className="text-primary-txt mx-1">
            <FaStar size={14} key={1} className="" />
          </p>
        </p>
        <div className="flex my-4">
          <div className="text-4xl flex item-center ">
            <div>
              {" "}
              <p>
                <IndianRupee size={30} className="inline" />
                {Number(product?.discountedPrice).toLocaleString("us")}
              </p>
              <p className="flex justify-center text-base text-custom-gray">
                (inc. all Taxes)
              </p>
            </div>
          </div>
          <div className="border mx-4"></div>
          <div className="text-3xl flex items-center text-custom-gray line-through ">
            <span>MRP. ₹</span>
            {Number(product?.price).toLocaleString("us")}
          </div>
          <div className="flex justify-center items-center mx-4 text-2xl">
            <p className="mx-4 bg-custom-btn px-4 py-2 rounded-lg cursor-pointer">
              Buy Now
            </p>
            <p className="mx-4 border border-white px-4 py-2 rounded-lg cursor-pointer">
              Add to Cart
            </p>
          </div>
        </div>
        <div className="border border-custom-gray my-4"></div>
        <div className="rounded-lg text-xl ">
          <p className="p-2 mx-2 text-2xl font-bold">Key Feature</p>
          {product?.keyFeatures.map((feature, index) => {
            return (
              <li className="p-2 mx-2" key={index}>
                {feature}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
