"use client";

import { StarRating } from "@/components/rating-stars";
// import { getProductFromId } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { SingleProductCarousel } from "../carousel";
import { useAppStore } from "@/store";
import { Button } from "../ui/button";
import { AddToCartModal, ProductReview, SimilarProducts } from ".";
import { getProductFromId } from "@/actions/one-entry-api-calls/one-entry";
import { Spinner } from "@/components/spinner";
import { addCartProductInDb, getAllProductFromCart } from "@/actions/cart";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";

interface SingleProductProps {
  productId: string;
}
const SingleProduct = ({ productId }: SingleProductProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [fetchedProduct, setFetchedProduct] = useState<any>(null);
  const user = useAuthUser();
  const {
    productCarouselImage,
    setOpenModal,
    setAddToCartProduct,
    addToCartProduct,
  } = useAppStore();

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = +productId.split("%")[0];
        const fetchedProduct = await getProductFromId(id);
        if (fetchedProduct) {
          setFetchedProduct(fetchedProduct[0]);
        }
      } catch (err) {
      } finally {
      }
    };
    fetchProduct();
  }, [productId]);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = async (product: ProductTypes) => {
    setOpenModal(true);
    if (user && user.id) {
      await addCartProductInDb({ productId: product.id, userId: user?.id });
      const updatedCart = [...addToCartProduct, product];
      setAddToCartProduct(updatedCart);
    } else {
      router.push("/login");
    }
  };
  return fetchedProduct ? (
    <div className="">
      <div className="md:flex w-full px-6 lg:container lg:px-0 pt-8 text-primary-txt">
        <div className="relative w-full mt-5 md:w-1/2 md:mr-5">
          {/* <div className="absolute text-red-400 flex justify-end w-full lg:ml-[-50px] ">
          <FaHeart size={22} />
        </div> */}
          <div className="flex">
            <div className="hidden md:visible md:flex md:justify-center md:items-center mr-8">
              <SingleProductCarousel
                images={fetchedProduct?.subImage}
                externalArrow={true}
              />
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={
                  productCarouselImage
                    ? productCarouselImage
                    : fetchedProduct.image
                }
                // src={fetchedProduct?.image}
                alt="singleproduct"
                width={500}
                height={500}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-sm sm:text-lg md:text-xl">
            {fetchedProduct?.name}
          </h1>
          {/* StarRating component if available */}
          {/* <StarRating rating={product ? product.rate : 0} /> */}
          <p className="flex w-10 justify-center items-center text-sm my-2 rounded-md bg-primary-btn font-bold ">
            <p className="text-primary-dark font-medium mt-[2px] ml-1">
              {fetchedProduct?.rate}
            </p>
            <p className="text-primary-dark font-medium mx-1">
              <FaStar size={14} />
            </p>
          </p>
          <div className="my-4">
            {/* Pricing Section */}
            <div className="flex items-center">
              <div className=" flex item-center">
                <div>
                  <p className="text-xl">
                    <IndianRupee size={20} className="inline   " />
                    {Number(fetchedProduct?.discountedPrice).toLocaleString(
                      "us"
                    )}
                  </p>
                  <p className="text-base text-primary-gray">
                    (inc. all Taxes)
                  </p>
                </div>
              </div>
              <div className="border-l border-primary-gray mx-4 h-12"></div>
              <div className="text-xl flex items-center text-primary-gray line-through">
                <span>MRP. ₹</span>
                {Number(fetchedProduct?.price).toLocaleString("us")}
              </div>
            </div>
            {/* Buttons Section */}
            <div className="flex justify-between items-center my-4">
              <Button className=" text-primary-dark font-medium bg-primary-btn px-4 py-2 rounded-lg cursor-pointer">
                Buy Now
              </Button>
              <Button
                onClick={() => {
                  if (fetchedProduct) {
                    handleAddToCart(fetchedProduct);
                  }
                }}
                className=" border border-white px-4 py-2 rounded-lg cursor-pointer bg-transparent"
              >
                Add to Cart
              </Button>
            </div>
            <AddToCartModal product={fetchedProduct} />
          </div>
          {/* <div className="border border-primary-gray my-2"></div> */}
          <div className="rounded-lg text-xl my-4 border border-primary-gray">
            <p className="text-2xl font-bold ml-4 mt-2">Key Features</p>
            {fetchedProduct?.keyFeatures.map((feature: any, index: number) => (
              <li className="text-base md:text-xl p-2 mx-2" key={index}>
                {feature}
              </li>
            ))}
          </div>
        </div>
      </div>
      <ProductReview />
      <SimilarProducts />
    </div>
  ) : (
    <div className="w-full h-[calc(100vh-88px)] flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default SingleProduct;
