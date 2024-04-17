"use client";

import { useAppStore } from "@/store";
import MultipleProductCarousel from "./multiple-product-carousel";

// import { dealOfTheDay } from "@/data-access/products";

const DealOfTheDayCarousel = () => {
  const { products } = useAppStore();
  return (
    <div className="text-primary-txt">
      <div className="text-4xl font-medium my-8 px-6 lg:container lg:px-0">
        Deal of the Day
      </div>
      {products.length > 0 && <MultipleProductCarousel products={products} />}
    </div>
  );
};

export default DealOfTheDayCarousel;
