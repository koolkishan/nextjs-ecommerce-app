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
    <div className="w-full lg:container">
      <Carousel
        className="w-full"
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent className="w-full flex">
          {categoryImages.map(({ id, image }) => (
            <CarouselItem key={id} className="flex-none mr-4 ">
              <div className="rounded-full shadow-md overflow-hidden">
                <div className="relative h-[150px] w-[200px] lg:h-[230px] lg:w-[294px] ">
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
        <CarouselPrevious externalArrow={true} className="hidden lg:bg-transparent lg:border-none lg:pl-[7px] lg:block lg:absolute lg:left-[-50px] lg:top-1/2 lg:-translate-y-1/2 " />
        <CarouselNext externalArrow={true} className="hidden lg:bg-transparent lg:border-none lg:pl-[7px] lg:block lg:absolute lg:right-[-50px] lg:top-1/2 lg:-translate-y-1/2  " />
      </Carousel>
      
    </div>
  );
};

export default CategoryCarousel;
