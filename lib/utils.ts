import { DealOfTheDayTypes, ProductTypes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePriceRanges({
  products,
}: {
  products: ProductTypes[];
}) {
  const minPrice = Math.min(...products.map((item) => item.price));
  const maxPrice = Math.max(...products.map((item) => item.price));
  const priceRanges: string[] = [];

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
      selectCategories?.length === 0 ||
      selectCategories?.includes(product.category);

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

export const getDealOfTheDayProducts = ({
  products,
}: {
  products: DealOfTheDayTypes[];
}) => {
  const filteredProducts = products.filter((p: DealOfTheDayTypes) => {
    return p.dealoftheday;
  });
  return filteredProducts;
};

export const mappedProducts = (productsData: any) => {
  // console.log("🚀 ~ mappedProducts ~ productsData:", productsData)
  const mapProducts = [];
  for (let productData of productsData) {
    const {
      id,
      attributeValues: {
        name,
        brand,
        image,
        price,
        title,
        subimage,
        keyfeatures,
        discountedprice,
        category,
        dealoftheday,
      },
      isVisible,
    } = productData;

    if (!isVisible) {
      return null;
    }

    const filteredData = {
      id,
      title: title.value,
      name: name.value,
      price: parseFloat(price.value),
      brand: brand.value,
      image: image.value.downloadLink,
      subImage: subimage.value.map((subImage: any) => subImage.downloadLink),
      discountedPrice: parseFloat(discountedprice.value),
      rate: 0,
      totalRating: 0,
      totalReview: 0,
      keyFeatures: keyfeatures.value
        .split("//")
        .map((feature: any) => feature.trim()),
      category: category.value,
      dealoftheday: parseInt(dealoftheday.value, 10),
    };
    mapProducts.push(filteredData);
  }
  return mapProducts;
};
