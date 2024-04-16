"use client";

import { StarRating } from "@/components/rating-stars";
import { getProductFromId } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { IndianRupee } from "lucide-react";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { SingleProductCarousel } from "../carousel";
import { useAppStore } from "@/store";
import { Button } from "../ui/button";
import { AddToCartModal } from ".";

interface SingleProductProps {
  productId: string;
}
const SingleProduct = ({ productId }: SingleProductProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    productCarouselImage,
    setOpenModal,
    setAddToCartProduct,
    addToCartProduct,
  } = useAppStore();
  console.log("🚀 ~ SingleProduct ~ addToCartProduct:", addToCartProduct);
  // console.log(productCarouselImage);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const product = getProductFromId(productId.split("%")[0]);
  const handleAddToCart = (product: ProductTypes) => {
    setOpenModal(true);
    const updatedCart = [...addToCartProduct, product];
    setAddToCartProduct(updatedCart);
  };
  return (
    <div className="md:flex w-full px-6 lg:container lg:px-0 pt-8 text-primary-txt">
      <div className="relative w-full mt-5 md:w-1/2 md:mr-5">
        {/* <div className="absolute text-red-400 flex justify-end w-full lg:ml-[-50px] ">
          <FaHeart size={22} />
        </div> */}
        <div className="flex">
          <div className="hidden md:visible md:flex md:justify-center md:items-center">
            <SingleProductCarousel
              images={product?.subImage}
              externalArrow={true}
            />
          </div>
          <div className="flex justify-center items-center">
            <Image
              // src={
              //   productCarouselImage
              //     ? productCarouselImage
              //     : "/deals-of-the-day/dealsOfTheDay1.png"
              // }
              src="/deals-of-the-day/dealsOfTheDay1.png"
              alt="singleproduct"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-sm sm:text-lg md:text-xl">{product?.name}</h1>
        {/* StarRating component if available */}
        {/* <StarRating rating={product ? product.rate : 0} /> */}
        <p className="flex w-10 justify-center items-center text-sm my-2 rounded-md bg-primary-btn font-bold ">
          <p className="text-primary-dark font-medium mt-[2px] ml-1">
            {product?.rate}
          </p>
          <p className="text-primary-dark font-medium mx-1">
            <FaStar size={14} />
          </p>
        </p>
        <div className="my-4">
          {/* Pricing Section */}
          <div className="flex items-center">
            <div className=" flex item-center">
              <div>
                <p className="text-xl">
                  <IndianRupee size={20} className="inline   " />
                  {Number(product?.discountedPrice).toLocaleString("us")}
                </p>
                <p className="text-base text-primary-gray">(inc. all Taxes)</p>
              </div>
            </div>
            <div className="border-l border-primary-gray mx-4 h-12"></div>
            <div className="text-xl flex items-center text-primary-gray line-through">
              <span>MRP. ₹</span>
              {Number(product?.price).toLocaleString("us")}
            </div>
          </div>
          {/* Buttons Section */}
          <div className="flex justify-between items-center my-4">
            <Button className=" text-primary-dark font-medium bg-primary-btn px-4 py-2 rounded-lg cursor-pointer">
              Buy Now
            </Button>
            <Button
              onClick={() => {
                if (product) {
                  handleAddToCart(product);
                }
              }}
              className=" border border-white px-4 py-2 rounded-lg cursor-pointer bg-transparent"
            >
              Add to Cart
            </Button>
          </div>
          <AddToCartModal products={product} />
        </div>
        {/* <div className="border border-primary-gray my-2"></div> */}
        <div className="rounded-lg text-xl my-4 border border-primary-gray">
          <p className="text-2xl font-bold ml-4 mt-2">Key Features</p>
          {product?.keyFeatures.map((feature, index) => (
            <li className="text-base md:text-xl p-2 mx-2" key={index}>
              {feature}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
