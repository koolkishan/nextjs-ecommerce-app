import { getProductFromId } from "@/data-access/products";
import { redirect } from "next/navigation";
import { SimilarProducts, SingleProduct } from "../_components";

interface SingleProductPageProps {
  params: {
    productId: string;
  };
}
const SingleProductPage = ({ params }: SingleProductPageProps) => {
  return (
    <div>
      <SingleProduct productId={params.productId} />
      <SimilarProducts />
    </div>
  );
};

export default SingleProductPage;
