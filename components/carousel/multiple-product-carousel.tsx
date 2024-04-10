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
    <div className="w-full py-4 lg:container">
      <div className="text-4xl font-medium my-8">Deal of the Day</div>
      <div className="">
        <Carousel>
          <CarouselContent>
            {products &&
              products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/4"
                >
                  <Card className="shadow-sm md:h-[450px] bg-transparent">
                    <CardContent className="aspect-square ">
                      <div className="relative flex flex-col px-4 py-5 sm:p-6">
                        {/* <q className="flex-1 text-gray-600 dark:text-gray-300">
                        {testimonial.quote}
                      </q> */}
                        <div className="absolute text-red-400 flex justify-end w-full ml-[-20px] ">
                          <FaHeart size={22} />
                        </div>
                        <div className="h-[150px] w-[200px] lg:h-[230px] lg:w-[294px] text-primary-txt">
                          <span className="inline-flex rounded-full">
                            <Image
                              loader={imageLoader}
                              className="h-10 w-10 rounded-full"
                              height={40}
                              width={40}
                              alt={product.name}
                              src="/deals-of-the-day/dealsOfTheDay1.png"
                              loading="lazy"
                            />
                          </span>
                          <div>
                            <p className="text-sm font-semibold ">
                              {product.name}
                            </p>
                            <div>
                              <p>
                                <IndianRupee className="inline" />
                                {product.price}
                              </p>
                              <p>
                                <IndianRupee className="inline" />
                                {product.discountedPrice}
                              </p>
                              <p>
                                <StarRating rating={product.rate} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
