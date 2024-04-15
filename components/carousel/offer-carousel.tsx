"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { offerImage } from "@/data-access/offer-images";

const OfferCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  return (
    <>
      <div className="">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
          opts={{
            slidesToScroll: "auto",
          }}
        >
          <CarouselContent>
            {offerImage.map((data, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[216px] w-full md:h-[427px]">
                  <Image
                    src={data.image}
                    fill
                    alt="everything"
                    objectFit=""
                    className="cursor-pointer transition-all duration-500 "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="translate-x-[60px] bg-gray-500/15" />
          <CarouselNext className="-translate-x-16 bg-gray-500/15" />
        </Carousel>
      </div>
    </>
  );
};

export default OfferCarousel;
