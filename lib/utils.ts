import { ProductTypes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function generatePriceRanges({ products }: { products: ProductTypes[] }) {
  const minPrice = Math.min(...products.map((item) => item.price));
  const maxPrice = Math.max(...products.map((item) => item.price));
  const priceRanges: string[] = [];

  for (let start = Math.floor(minPrice / 10000) * 10000; start <= maxPrice; start += 10000) {
    const end = start + 10000;
    priceRanges.push(`${start + 1}-${end}`);
  }

  return priceRanges;
}

export function generateBrands({ products }: { products: ProductTypes[] }) {
  const brands = products.map((product) => product.brand);
  const uniqueBrands = Array.from(new Set(brands));
  return uniqueBrands;
}

export function generateCategories({ products }: { products: ProductTypes[] }) {
  const categories = products.map((product) => product.category);
  const uniqueCategories = Array.from(new Set(categories));
  return uniqueCategories;
}

export const filterProducts = ({
  products,
  selectBrands,
  selectCategories,
  selectPrices,
}: {
  products: ProductTypes[];
  selectCategories?: string[];
  selectPrices?: string[];
  selectBrands?: string[];
}) => {
  return products.filter((product) => {
    const matchesCategory =
      selectCategories?.length === 0 || selectCategories?.includes(product.category);

    const matchesPrice =
      selectPrices?.length === 0 ||
      selectPrices?.some((priceRange) => {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        return product.price >= minPrice && product.price <= maxPrice;
      });

    const matchesBrand =
      selectBrands?.length === 0 || selectBrands?.includes(product.brand);

    return matchesCategory && matchesPrice && matchesBrand;
  });
};

export const sortByProduct = ({
  products,
  sortBy,
}: {
  products: ProductTypes[];
  sortBy: string | undefined;
}) => {
  switch (sortBy) {
    case "Price (Lowest First)":
      return products.sort((a, b) => a.price - b.price);

    case "Price (Highest First)":
      return products.sort((a, b) => b.price - a.price);

    case "Latest Arrival":
      // Assuming you have an arrival date field on your ProductTypes, use it here
      // return products.sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime());

    default:
      return products; // Return the products as is if sortBy is not recognized
  }
};

// export function genratePriceRanges({ products }: { products: ProductTypes[] }) {
//   const minPrice = Math.min(...products.map((item) => item.price));
//   const maxPrice = Math.max(...products.map((item) => item.price));
//   const priceRanges = [];
//   for (
//     let start = Math.floor(minPrice / 10000) * 10000;
//     start <= maxPrice;
//     start += 10000
//   ) {
//     const end = start + 10000;
//     priceRanges.push(`${start + 1}-${end}`);
//   }
//   return priceRanges;
// }

// export function genrateBrands({ products }: { products: ProductTypes[] }) {
//   const brands = products.map((product) => product.brand);
//   const uniqueBrands = brands.filter((brand, index) => {
//     return brands.indexOf(brand) === index;
//   });
//   return uniqueBrands;
// }

// export function genrateCategories({ products }: { products: ProductTypes[] }) {
//   const categories = products.map((product) => product.category);
//   const uniqueCategories = categories.filter((category, index) => {
//     return categories.indexOf(category) === index;
//   });
//   return uniqueCategories;
// }

// export const filterProducts = ({
//   products,
//   selectBrands,
//   selectCategories,
//   selectPrices,
// }: {
//   products: ProductTypes[];
//   selectCategories: string[];
//   selectPrices: string[];
//   selectBrands: string[];
// }) => {
//   return products.filter((product) => {
//     const matchesCategory =
//       selectCategories.length === 0 ||
//       selectCategories.includes(product.category);

//     const matchesPrice =
//       selectPrices.length === 0 ||
//       selectPrices.some((priceRange) => {
//         const [minPrice, maxPrice] = priceRange.split("-").map(Number);
//         return product.price >= minPrice && product.price <= maxPrice;
//       });

//     const matchesBrand =
//       selectBrands.length === 0 || selectBrands.includes(product.brand);

//     return matchesCategory && matchesPrice && matchesBrand;
//   });
// };

// export const sortByProduct = ({
//   products,
//   sortBy,
// }: {
//   products: ProductTypes[];
//   sortBy: string | undefined;
// }) => {
//   // Default to unsorted products

//   // let products = [];

//   // Handle sorting based on the sortBy parameter
//   if (sortBy === "Price (Lowest First)") {
//     console.log("🚀 ~ sortBy:", sortBy);

//     products.sort((a, b) => +a.price - +b.price);
//     console.log("Sorted by Price (Lowest First):", products);
//   } else if (sortBy === "Price (Highest First)") {
//     console.log("🚀 ~ sortBy:", sortBy);

//     products.sort((a, b) => +b.price - +a.price);
//     console.log("Sorted by Price (Highest First):", products);
//   } else if (sortBy === "Latest Arrival") {
//     // Assuming the products have a property for arrival date,
//     // sort based on arrival date (newest first).
//     // products.sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime());
//     // console.log("Sorted by Latest Arrival:", products);
//     return products;
//   } else {
//     console.log("🚀 ~ sortBy:", sortBy);

//     // If sortBy does not match any known criteria, return unsorted products
//     console.log("No valid sort by criteria, returning unsorted products.");
//     return products;
//   }

//   // Return the sorted products
//   return products;
// };
