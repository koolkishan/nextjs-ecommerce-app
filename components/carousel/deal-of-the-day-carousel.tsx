"use client";

import MultipleProductCarousel from "./multiple-product-carousel";

import { dealOfTheDay } from "@/data-access/products";

const DealOfTheDayCarousel = () => {
  return (
    <div>
      <div className="text-4xl font-medium my-8 px-6 lg:container lg:px-0">Deal of the Day</div>
      {dealOfTheDay && <MultipleProductCarousel products={dealOfTheDay} />}
    </div>
  );
};

export default DealOfTheDayCarousel;
