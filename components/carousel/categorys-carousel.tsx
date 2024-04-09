"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { categoryImages } from "@/data-access/category-images";

const CategoryCarousel = () => {
  return (
    <div className="w-full mx-4">
      <Carousel
        className="w-full"
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent className="w-full flex">
          {categoryImages.map(({ id, image }) => (
            <CarouselItem key={id} className="flex-none mr-4">
              <div className="rounded-full shadow-md">
                <div className="relative h-[230px] w-[294px] ">
                  <Image
                    src={image}
                    alt="logo-maker"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-full"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-16 bg-gray-500/15" />
        <CarouselNext className="-translate-x-16 bg-gray-500/15" />
      </Carousel>
      {/* <Carousel
        className=""
        // opts={{
        //   slidesToScroll: "auto",
        // }}
      >
        <CarouselContent className="flex justify-center items-center">
          {Array.from({ length: 18 }).map((_, index) => (
            <CarouselItem key={index} className="basis-auto">
              <div className="p-1 mx-4">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
};

export default CategoryCarousel;
