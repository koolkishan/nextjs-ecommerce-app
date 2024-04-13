import { ProductTypes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genratePriceRanges({ products }: { products: ProductTypes[] }) {
  const minPrice = Math.min(...products.map((item) => item.price));
  const maxPrice = Math.max(...products.map((item) => item.price));
  const priceRanges = [];
  for (
    let start = Math.floor(minPrice / 10000) * 10000;
    start <= maxPrice;
    start += 10000
  ) {
    const end = start + 10000;
    priceRanges.push(`${start + 1}-${end}`);
  }
  return priceRanges;
}

export function genrateBrands({ products }: { products: ProductTypes[] }) {
  const brands = products.map((product) => product.brand);
  const uniqueBrands = brands.filter((brand, index) => {
    return brands.indexOf(brand) === index;
  });
  return uniqueBrands;
}
