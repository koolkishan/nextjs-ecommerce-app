"use client";
import { useEffect, useState } from "react";
import { dealOfTheDay } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { useAppStore } from "@/store";
import { ProductSpecification } from "../product-specification";

interface SearchProductsProps {
  searchField: string;
}
const SearchProducts = ({ searchField }: SearchProductsProps) => {
  const [searchedProducts, setsearchedProducts] = useState<ProductTypes[] | []>(
    []
  );
  const { searchTerm } = useAppStore();
  useEffect(() => {
    const items = dealOfTheDay.filter((item: ProductTypes) => {
      return item.title
        .split(" ")
        .join("")
        .toLowerCase()
        .trim()
        .includes(searchField.toLowerCase().trim());
    });
    if (items.length) setsearchedProducts(items);
  }, [searchField]);
  return (
    <div className="w-full px-6 lg:container lg:px-0">
      {/* heading */}
      <div className="w-full h-16 flex items-center">
        <p className="text-2xl font-bold">
          Result for {`"${searchTerm}"`}{" "}
          <span className="text-base text-slate-300 font-medium">{`(${searchedProducts.length})`}</span>
        </p>
      </div>
      {/* specification */}
      <div className="flex w-full justify-between">
        <div className="flex">
          <ProductSpecification
            category={true}
            searchedProducts={searchedProducts}
          />
          <ProductSpecification
            price={true}
            searchedProducts={searchedProducts}
          />
          <ProductSpecification
            brand={true}
            searchedProducts={searchedProducts}
          />
        </div>
        <div>
          <ProductSpecification
            sortBy={true}
            searchedProducts={searchedProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
