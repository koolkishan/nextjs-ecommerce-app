"use server";
import { defineOneEntry } from "oneentry";
// const api = defineOneEntry('https://ecommerce.oneentry.cloud')
const config = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZWNvbW1lcmNlLWFwcCIsInNlcmlhbE51bWJlciI6MSwiaWF0IjoxNzEzMjcwODcyLCJleHAiOjE3NDQ4MDY4NjF9.1RjthgBlUMCUmxDzTf9QGcbazKNpBjWrn3jwFEo_NEs",
    
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

export const oneEntryTry = async () => {
    const value = await Products.getProducts('en_US');
    console.log("🚀 ~ oneEntryTry ~ value:", value);
};
