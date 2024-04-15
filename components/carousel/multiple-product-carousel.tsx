"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { imageLoader } from "@/lib/image-loader";
import { DealOfTheDayTypes } from "@/types";
import { IndianRupee, X } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { StarRating } from "../rating-stars";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store";
interface MultipleProductCarouselPropes {
  products?: DealOfTheDayTypes[];
}
const MultipleProductCarousel = ({
  products,
}: MultipleProductCarouselPropes) => {
  const router = useRouter();
  const { compareProduct, setCompareProduct } = useAppStore();
  const handleClick = (productId: number) => {
    router.push(`/product/${productId}}`);
  };
  const handleRemove = (id: number, index: number) => {
    const newCompareProduct = compareProduct
      .slice(0, index)
      .concat(compareProduct.slice(index + 1));
    setCompareProduct(newCompareProduct);
  };
  return (
    <div className="w-full py-4 px-6 lg:container lg:px-0">
      <div className="">
        <Carousel>
          <CarouselContent className="ml-2">
            {products &&
              products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/4  mx-3 "
                >
                  <div className="relative flex flex-col px-4 py-5 sm:p-6 border rounded-lg">
                    <div className="absolute text-red-400 flex justify-end w-full ml-[-50px]">
                      <FaHeart size={22} className="cursor-pointer" />
                    </div>
                    <div className="w-full flex-1 text-primary-txt">
                      <div className="inline-flex justify-center mt-10 rounded-lg w-full">
                        <Image
                          onClick={() => handleClick(product.id)}
                          loader={imageLoader}
                          className="h-full w-full"
                          height={200}
                          width={80}
                          alt={product.name}
                          src="/deals-of-the-day/dealsOfTheDay1.png"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-full text-sm sm:text-base  lg:text-xl">
                        <p className=" font-semibold truncate ">
                          {product.name}
                        </p>
                        <div className="flex my-2">
                          <p className="flex item-center ">
                            <IndianRupee className="inline" />
                            {Number(product.price).toLocaleString("us")}
                          </p>
                          <p className="text-sm flex items-center text-primary-gray line-through mx-2">
                            <span className="text-xl">₹</span>
                            {Number(product.discountedPrice).toLocaleString(
                              "us"
                            )}
                          </p>
                        </div>
                        <p>
                          <StarRating rating={product.rate} />
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselPrevious
            externalArrow={true}
            className="hidden lg:bg-transparent lg:border-none lg:pl-[7px] lg:block lg:absolute lg:left-[-50px] lg:top-1/2 lg:-translate-y-1/2 "
          />
          <CarouselNext
            externalArrow={true}
            className="hidden lg:bg-transparent lg:border-none lg:pl-[7px] lg:block lg:absolute lg:right-[-50px] lg:top-1/2 lg:-translate-y-1/2  "
          />
        </Carousel>
      </div>
    </div>
  );
};

export default MultipleProductCarousel;
