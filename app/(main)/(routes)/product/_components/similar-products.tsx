import { MultipleProductCarousel } from "@/components/carousel";
import { dealOfTheDay } from "@/data-access/products";

const SimilarProducts = () => {
  return (
    <div>
      <div className="text-4xl font-medium my-8 px-6 lg:container lg:px-0">Similar Products</div>
      {dealOfTheDay && <MultipleProductCarousel products={dealOfTheDay} />}
    </div>
  );
};

export default SimilarProducts;
