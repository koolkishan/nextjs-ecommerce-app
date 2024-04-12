import { CategoryCarousel, OfferCarousel } from "@/components/carousel";
import DealOfTheDayCarousel from "@/components/carousel/deal-of-the-day-carousel";

export default function Home() {
  return (
    <div className="">
      <OfferCarousel />
      <CategoryCarousel />
      <DealOfTheDayCarousel/>
    </div>
  );
}
