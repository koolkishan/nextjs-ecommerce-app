import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
interface FilterProductsProps {
  products: ProductTypes[];
}
const FilterProducts = ({ products }: FilterProductsProps) => {
  return (
    <div className="w-full grid grid-cols-3 gap-16 px-6 lg:px-0 lg:container mt-28">
      {products.length > 0 &&
        products.map((product, index) => {
          return (
            <div key={index} className="border-b-2 pb-3 border-custom-gray">
              <div className="relative bg-gray-400/20 flex  justify-center items-center rounded-xl">
                <div className="absolute w-full  mt-[-200px] mr-10 text-end">
                  {/* <input
                    type="checkbox"
                    className="inline w-5 h-5 mt-[10px] text-primary-txt border rounded-md checked:border checked:rounded-md checked:border-primary"
                  /> */}
                  <p className="inline mt-[-10px] p-3 rounded-2xl bg-black/20">
                    Compare
                  </p>
                </div>
                <Image
                  src="/deals-of-the-day/dealsOfTheDay1.png"
                  alt="singleproduct"
                  width={270}
                  height={270}
                />
              </div>
              <p className="my-10 font-bold text-lg">{product.name}</p>
              <div className="flex items-center text-lg text-custom-btn ">
                <p className=" font-bold mr-1">{product.rate}</p>
                <div className="mr-3 ">
                  <FaStar />
                </div>
                <p>{`(${product.totalRating})`}</p>
              </div>
              <div className="flex items-center my-4">
                <p className="text-2xl font-bold">
                  {" "}
                  <span className="text-2xl">₹</span>
                  {Number(product.discountedPrice).toLocaleString("us")}
                </p>
                <p className="line-through  text-custom-gray">
                  <p className="mx-3">
                    <IndianRupee className="inline" size={17} />
                    {Number(product.price).toLocaleString("us")}
                  </p>
                </p>
                <p className="text-sm mr-3 text-custom-gray">{`(Save ₹${Number(+product.price - +product.discountedPrice).toLocaleString("us")})`}</p>
                <p className="text-[12px] border px-1 rounded-md font-bold">
                  {(
                    100 -
                    (product.discountedPrice * 100) / product.price
                  ).toFixed(2)}
                  %off
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FilterProducts;
