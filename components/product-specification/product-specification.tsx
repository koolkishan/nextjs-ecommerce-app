/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  cn,
  genratePriceRanges,
  genrateBrands,
  genrateCategories,
  filterProducts,
  sortByProduct,
} from "@/lib/utils";
import { useAppStore } from "@/store";
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
  console.log("🚀 ~ searchedProducts:", searchedProducts);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [selectPrices, setSelectPrices] = useState<string[]>([]);
  const [selectBrands, setSelectBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortByProducts, setSortByProducts] = useState<string>();
  // console.log("🚀 ~ sortByProducts:", sortByProducts);

  const { filterProduct, setFilterProduct } = useAppStore();
  console.log("🚀 ~ filterProduct:", filterProduct);

  function handleSelection(
    event: ChangeEvent<HTMLInputElement>,
    setSelection: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    const value = event.target.value;
    if (event.target.checked) {
      setSelection((prevSelection) => [...prevSelection, value]);
    } else {
      setSelection((prevSelection) =>
        prevSelection.filter((option: string) => option !== value)
      );
    }
  }

  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelection(event, setSelectCategories);
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelection(event, setSelectPrices);
  };

  const handleBrand = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelection(event, setSelectBrands);
  };

  const handleSortBy = (sortBy: string) => {
    // console.log(sortBy);
    setSortByProducts(sortBy);
  };

  useEffect(() => {
    if (category) {
      const categories = genrateCategories({ products: searchedProducts });
      setCategories(categories);
    }
    if (price) {
      const priceRange = genratePriceRanges({ products: searchedProducts });
      setPriceRange(priceRange);
    }
    if (brand) {
      const brands = genrateBrands({ products: searchedProducts });
      setBrands(brands);
    }
  }, [category, brand, price, searchedProducts]);

  useEffect(() => {
    setFilterProduct(searchedProducts);
  }, []);

  useEffect(() => {
    if (filterProduct.length) {
      let filtered = filterProducts({
        products: filterProduct,
        selectCategories,
        selectPrices,
        selectBrands,
      });
      setFilterProduct(filtered);
    } else {
      let filtered = filterProducts({
        products: searchedProducts,
        selectCategories,
        selectPrices,
        selectBrands,
      });
      setFilterProduct(filtered);
    }
  }, [selectCategories, selectPrices, selectBrands]);

  // use;
  useEffect(() => {
    if (sortBy) {
      const filtered = sortByProduct({
        products: filterProduct,
        sortBy: sortByProducts,
      });
      setFilterProduct(filtered);
    }
  }, [sortByProducts]);

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
          <Select onValueChange={handleSortBy}>
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
                value={`Price (Highest First)`}
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
