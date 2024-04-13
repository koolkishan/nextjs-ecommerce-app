"use client";
import { Input } from "@/components/ui/input";
import { dealOfTheDay } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

const Search = () => {
  const [searchItem, setsearchItem] = useState<ProductTypes[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { setSearchTerm } = useAppStore();
  // const [searchTerm, setsearchTerm] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let searchedProducts: typeof dealOfTheDay = [];
    const seenProductIds: number[] = [];
    const seenProductTitles: string[] = [];

    if (searchTerm) {
      // setSearchTerm(searchTerm);
      searchedProducts = dealOfTheDay.filter((product) => {
        const matchesSearchTerm = product.name
          .toLowerCase()
          .trim()
          .includes(searchTerm);
        if (
          matchesSearchTerm &&
          !seenProductIds.includes(product.id) &&
          !seenProductTitles.includes(product.name.toLowerCase().trim())
        ) {
          seenProductIds.push(product.id);
          seenProductTitles.push(product.name.toLowerCase().trim());
          return true;
        }
        return false;
      });
    }
    setsearchItem(searchedProducts);
    setSelectedIndex(-1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < searchItem.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
    // else if (e.key === "Enter" && selectedIndex >= 0) {
    //   // Handle Enter key if an item is selected
    //   const selectedProduct = searchItem[selectedIndex];
    // }
  };

  return (
    <div className="relative">
      <Input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="text-black"
        placeholder="What are you looking for?"
        // value={searchTerm ? searchTerm : ''}
      />
      <div className="absolute hidden md:block w-full bg-primary-dark shadow-2xl rounded-lg ">
        {searchItem &&
          searchItem.map((product: ProductTypes, index: number) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={index}
                className={`m-4 border-b border-gray-200/15 ${isSelected ? "border-b-gray-400" : ""}`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <p
                  onClick={(e: any) => {
                    setSearchTerm(e.target.innerText);
                    router.push(
                      `/search/${e.target.innerText.split(" ").join("")}`
                    );
                    // setsearchTerm(null);
                    setsearchItem([]);
                  }}
                  className="truncate mb-4 cursor-pointer"
                >
                  {product.title}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
