"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/useDebounce";
import {
  cn,
  generatePriceRanges,
  generateBrands,
  generateCategories,
  filterProducts,
  sortByProduct,
} from "@/lib/utils";
import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";

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
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [selectPrices, setSelectPrices] = useState<string[]>([]);
  const [selectBrands, setSelectBrands] = useState<string[]>([]);
  const [sortByProducts, setSortByProducts] = useState<string>("");

  // Debounced values for filtering and sorting
  const debouncedSelectCategories = useDebounce(selectCategories, 300);
  const debouncedSelectPrices = useDebounce(selectPrices, 300);
  const debouncedSelectBrands = useDebounce(selectBrands, 300);
  const debouncedSortByProducts = useDebounce(sortByProducts, 300);

  // State variables to hold filter options (price ranges, brands, categories)
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Zustand store usage
  const { filterProduct, setFilterProduct } = useAppStore();

  // Initialize filter options based on products
  useEffect(() => {
    if (category) {
      const categories = generateCategories({ products: searchedProducts });
      setCategories(categories);
    }
    if (price) {
      const priceRange = generatePriceRanges({ products: searchedProducts });
      setPriceRange(priceRange);
    }
    if (brand) {
      const brands = generateBrands({ products: searchedProducts });
      setBrands(brands);
    }
  }, [category, price, brand, searchedProducts]);

  // Initialize the product list in the store based on the searched products
  useEffect(() => {
    setFilterProduct(searchedProducts);
  }, [searchedProducts, setFilterProduct]);

  // Filter products whenever the debounced filter criteria change
  useEffect(() => {
    const filtered = filterProducts({
      products: searchedProducts,
      selectCategories: debouncedSelectCategories,
      selectPrices: debouncedSelectPrices,
      selectBrands: debouncedSelectBrands,
    });
    setFilterProduct(filtered);
  }, [
    debouncedSelectCategories,
    debouncedSelectPrices,
    debouncedSelectBrands,
    searchedProducts,
    setFilterProduct,
  ]);

  // Sort products whenever the debounced sorting criteria change
  useEffect(() => {
    const sorted = sortByProduct({
      products: filterProduct,
      sortBy: debouncedSortByProducts,
    });
    setFilterProduct(sorted);
  }, [debouncedSortByProducts, filterProduct, setFilterProduct]);

  // Event handlers for selection changes
  const handleSelection = (
    event: ChangeEvent<HTMLInputElement>,
    setSelection: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelection((prevSelection) => [...prevSelection, value]);
    } else {
      setSelection((prevSelection) =>
        prevSelection.filter((option) => option !== value)
      );
    }
  };

  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelection(event, setSelectCategories);
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelection(event, setSelectPrices);
  };

  const handleBrand = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelection(event, setSelectBrands);
  };

  const handleSortBy = (value: string) => {
    setSortByProducts(value);
  };

  return (
    <div className="mt-6 text-primary-white">
      {category && (
        <Select>
          <SelectTrigger className="w-fit bg-gray-400/20 border-none h-8 mr-3">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-400/20 border-none">
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
                    "w-5 h-5 text-primary-txt border rounded-md",
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
          <SelectContent className="bg-gray-400/20 border-none">
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
                    "w-5 h-5 text-primary-txt border rounded-md",
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
          <SelectContent className="bg-gray-400/20 border-none">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center mx-2 rounded-lg my-2"
              >
                <input
                  id={`brand-${index}`}
                  type="checkbox"
                  value={brand}
                  checked={selectBrands.includes(brand)}
                  onChange={handleBrand}
                  className={cn(
                    "w-5 h-5 text-primary-txt border rounded-md",
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
      {sortBy && (
        <Select onValueChange={handleSortBy}>
          <SelectTrigger className="w-fit bg-gray-400/20 border-none h-8 mr-3">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-gray-400/20 border-none text-primary-txt">
            <SelectItem value="Price (Lowest First)">
              Price (Lowest First)
            </SelectItem>
            <SelectItem value="Price (Highest First)">
              Price (Highest First)
            </SelectItem>
            <SelectItem value="Latest Arrival">Latest Arrival</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ProductSpecification;
