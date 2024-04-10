"use client";

import MultipleProductCarousel from "./multiple-product-carousel";

import { dealOfTheDay } from "@/data-access/products";

const DealOfTheDayCarousel = () => {
  return (
   <div>
     {dealOfTheDay && <MultipleProductCarousel products={dealOfTheDay} />}
   </div>
  );
};

export default DealOfTheDayCarousel;
