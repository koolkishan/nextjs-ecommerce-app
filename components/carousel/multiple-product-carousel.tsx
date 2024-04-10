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
import { Card, CardContent } from "@/components/ui/card";
import { DealOfTheDayTypes } from "@/types";
import { IndianRupee } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { StarRating } from "../rating-stars";

const testimonials = [
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
  {
    quote: "lorem Ipsum lorem lorem ipsum dolor sit amet, consectetur adip",
    name: "lorem Ipsum ",
    role: "role",
  },
];

interface MultipleProductCarouselPropes {
  products?: DealOfTheDayTypes[];
}
const MultipleProductCarousel = ({
  products,
}: MultipleProductCarouselPropes) => {
  return (
    <div className="w-full py-4 px-6 lg:container lg:px-0">
      <div className="text-4xl font-medium my-8">Deal of the Day</div>
      <div className="">
        <Carousel>
          <CarouselContent className="ml-2">
            {products &&
              products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/4 border rounded-lg mx-3 "
                >
                  {/* <Card className="shadow-sm md:h-[450px] bg-transparent"> */}
                  {/* <CardContent className="aspect-square "> */}
                  <div className="relative flex flex-col px-4 py-5 sm:p-6">
                    <div className="absolute text-red-400 flex justify-end w-full ml-[-50px] ">
                      <FaHeart size={22} />
                    </div>

                    <div className="w-full flex-1 text-primary-txt">
                      <div className="inline-flex justify-center mt-10 rounded-lg w-full">
                        <Image
                          loader={imageLoader}
                          className="h-full w-full"
                          height={200}
                          width={80}
                          alt={product.name}
                          src="/deals-of-the-day/dealsOfTheDay1.png"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-full text-xl">
                        <p className=" font-semibold truncate ">
                          {product.name}
                        </p>
                        <div className="flex my-2">
                          <p>
                            <IndianRupee className="inline" />
                            {Number(product.price).toLocaleString("us")}
                          </p>
                          <p className="text-sm flex items-center text-custom-gray line-through mx-2">
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
                  {/* </CardContent> */}
                  {/* </Card> */}
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
