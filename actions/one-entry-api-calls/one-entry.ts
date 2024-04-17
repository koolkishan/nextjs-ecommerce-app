"use server";
import { mappedProducts } from "@/lib/utils";
import { defineOneEntry } from "oneentry";
// const api = defineOneEntry('https://ecommerce.oneentry.cloud')
const config = {
  token: process.env.OPEN_ENTRY_CMS_TOKEN,
  langCode: "en_US",
  multipleRequests: true,
};
const {
  Admins,
  AttributesSets,
  Blocks,
  Forms,
  FormData,
  FileUploading,
  GeneralTypes,
  Locales,
  Markers,
  Menus,
  Pages,
  Products,
  ProductStatuses,
  System,
  Templates,
  TemplatePreviews,
} = defineOneEntry("https://ecommerce.oneentry.cloud", config);

export const getProducts = async () => {
  const productsData = await Products.getProducts("en_US");
  const products = mappedProducts(productsData);
  return products;
};

export const getProductFromId = async (productId: number) => {
  console.log("🚀 ~ getProductFromId ~ productId:", productId);
  const data = [await Products.getProductById(+productId)];
  console.log("🚀 ~ getProductFromId ~ data:", data);
  const product = mappedProducts(data);
  return product;
};
