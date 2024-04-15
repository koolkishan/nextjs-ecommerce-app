import { MultipleProductCarousel } from "@/components/carousel";
import { dealOfTheDay } from "@/data-access/products";

const SimilarProducts = () => {
  return (
    <div>
      <div className="text-2xl text-primary-txt md:text-4xl font-bold  my-8 px-6 lg:container lg:px-0">Similar Products</div>
      {dealOfTheDay && <MultipleProductCarousel products={dealOfTheDay} />}
    </div>
  );
};

export default SimilarProducts;
