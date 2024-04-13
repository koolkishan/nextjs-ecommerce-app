"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { cn, genratePriceRanges, genrateBrands } from "@/lib/utils";
import { ProductTypes } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";

interface ProductSpecificationProps {
  category?: boolean;
  price?: boolean;
  brand?: boolean;
  sortBy?: boolean;
  searchedProducts: ProductTypes[];
}
const ProductSpecification = ({
  category,
  price,
  brand,
  sortBy,
  searchedProducts,
}: ProductSpecificationProps) => {
  const categories = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
  ];
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [selectPrices, setSelectPrices] = useState<string[]>([]);
  const [selectBrands, setSelectBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    if (event.target.checked) {
      setSelectCategories([...selectCategories, value]);
    } else {
      setSelectCategories(
        selectCategories.filter((option: any) => option !== value)
      );
    }
  };
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    if (event.target.checked) {
      setSelectPrices([...selectPrices, price]);
    } else {
      setSelectPrices(
        selectPrices.filter((option: string) => option !== price)
      );
    }
  };
  const handleBrand = (event: ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.value;
    if (event.target.checked) {
      setSelectBrands([...selectBrands, brand]);
    } else {
      setSelectBrands(
        selectBrands.filter((option: string) => option !== brand)
      );
    }
  };
  useEffect(() => {
    if (price) {
      const priceRange = genratePriceRanges({ products: searchedProducts });
      setPriceRange(priceRange);
    }
    if (brand) {
      const brands = genrateBrands({ products: searchedProducts });
      setBrands(brands);
    }
  }, [brand, price, searchedProducts]);
  return (
    <>
      <div>
        {category && (
          <Select>
            <SelectTrigger className="w-fit bg-gray-400/20 border-none h-8 mr-3">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className=" bg-gray-400/20 border-none">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="flex items-center mx-2 rounded-lg my-2"
                >
                  <input
                    id={`option-${index}`}
                    type="checkbox"
                    value={cat}
                    checked={selectCategories.includes(cat)}
                    onChange={handleCategory}
                    className={cn(
                      "w-5 h-5 text-primary-txt border rounded-md checked:border checked:rounded-md checked:border-primary",
                      selectCategories.includes(cat) ? "" : "appearance-none"
                    )}
                  />
                  <label
                    className="text-primary-txt px-2 block"
                    htmlFor={`option-${index}`}
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </SelectContent>
          </Select>
        )}
        {price && (
          <Select>
            <SelectTrigger className="w-fit bg-gray-400/20 border-none h-8 mr-3">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent className=" bg-gray-400/20 border-none">
              {priceRange.map((price, index) => (
                <div
                  key={index}
                  className="flex items-center mx-2 rounded-lg my-2"
                >
                  <input
                    id={`price-${index}`}
                    type="checkbox"
                    value={price}
                    checked={selectPrices.includes(price)}
                    onChange={handlePrice}
                    className={cn(
                      "w-5 h-5 text-primary-txt border rounded-md checked:border checked:rounded-md checked:border-primary",
                      selectPrices.includes(price) ? "" : "appearance-none"
                    )}
                  />
                  <label
                    className="text-primary-txt px-2 block"
                    htmlFor={`option-${index}`}
                  >
                    {price}
                  </label>
                </div>
              ))}
            </SelectContent>
          </Select>
        )}
        {brand && ( 
          <Select>
            <SelectTrigger className="w-fit bg-gray-400/20 border-none h-8 mr-3">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent className=" bg-gray-400/20 border-none">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center mx-2 rounded-lg my-2"
                >
                  <input
                    id={`price-${index}`}
                    type="checkbox"
                    value={brand}
                    checked={selectBrands.includes(brand)}
                    onChange={handleBrand}
                    className={cn(
                      "w-5 h-5 text-primary-txt border rounded-md checked:border checked:rounded-md checked:border-primary",
                      selectBrands.includes(brand) ? "" : "appearance-none"
                    )}
                  />
                  <label
                    className="text-primary-txt px-2 block"
                    htmlFor={`option-${index}`}
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div>
        {sortBy && (
          <Select>
            <SelectTrigger className="w-fit bg-gray-400/20 border-none h-8 mr-3">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className=" bg-gray-400/20 border-none ">
              <SelectItem
                className="hover:bg-none cursor-pointer text-primary-txt"
                value="Price (Lowest First)"
              >{`Price (Lowest First)`}</SelectItem>
              <SelectItem
                className="hover:bg-none cursor-pointer text-primary-txt"
                value="`Price (Highest First)"
              >{`Price (Highest First)`}</SelectItem>
              <SelectItem
                className="hover:bg-none cursor-pointer text-primary-txt"
                value="Latest Arrival"
              >
                Latest Arrival
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  );
};

export default ProductSpecification;
