"use server";
import { mappedProducts } from "@/lib/utils";
import { defineOneEntry } from "oneentry";
import { any } from "zod";
// const api = defineOneEntry('https://ecommerce.oneentry.cloud')
const config = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9rZW4iLCJzZXJpYWxOdW1iZXIiOjEsImlhdCI6MTcxMzI1MDk0OSwiZXhwIjoxNzQ0Nzg2ODg3fQ.xDNC5sxpwDywuytZ2y4Xo8UwrqFBIjLhCgXm0tbDmQU",

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
  // console.log("🚀 ~ getProducts ~ productsData:", productsData)
  // const filteredProducts = [];
  // for (let productData of productsData) {
  //   const {
  //     id,
  //     attributeValues: {
  //       name,
  //       brand,
  //       image,
  //       price,
  //       title,
  //       subimage,
  //       keyfeatures,
  //       discountedprice,
  //       category,
  //       dealoftheday,
  //     },
  //     isVisible,
  //   } = productData;

  //   if (!isVisible) {
  //     return null;
  //   }

  //   const filteredData = {
  //     id,
  //     title: title.value,
  //     name: name.value,
  //     price: parseFloat(price.value),
  //     brand: brand.value,
  //     image: image.value.downloadLink,
  //     subImage: subimage.value.map((subImage: any) => subImage.downloadLink),
  //     discountedPrice: parseFloat(discountedprice.value),
  //     rate: 0,
  //     totalRating: 0,
  //     totalReview: 0,
  //     keyFeatures: keyfeatures.value
  //       .split("//")
  //       .map((feature: any) => feature.trim()),
  //     category: category.value,
  //     dealoftheday: parseInt(dealoftheday.value, 10),
  //   };
  //   filteredProducts.push(filteredData);
  // }
  // console.log("🚀 ~ getProducts ~ filteredProducts:", filteredProducts);
  // return filteredProducts;
  const products = mappedProducts(productsData);
  // console.log("🚀 ~ getProducts ~ products:", products)
  return products;
};

export const getProductFromId = async (productId: number) => {
  const data = [await Products.getProductById(+productId)];
  const product = mappedProducts(data); 
  return product;
};
// export const getProducts = async () => {
//   const products = await Products.getProducts('en_us');
//   console.log(products[0]);
// }

// {
//   id: 5,
//   localizeInfos: { title: 'Mobile & Mobile Accessories' },
//   relatedIds: [],
//   statusId: null,
//   attributeSetId: 4,
//   position: 5,
//   templateIdentifier: null,
//   shortDescTemplateIdentifier: null,
//   price: null,
//   sku: null,
//   isSync: true,
//   attributeValues: {
//     name: {
//       type: 'string',
//       value: 'Apple iPhone 15 Pro Max (256GB, Black Titanium)',
//       position: 1,
//       isProductPreview: false
//     },
//     brand: {
//       type: 'string',
//       value: 'apple',
//       position: 3,
//       isProductPreview: false
//     },
//     image: {
//       type: 'image',
//       value: {
//         size: 832836,
//         filename: 'files/project/page/9/image/300826_0_ujhvyj.png',
//         previewLink: '',
//         downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/image/300826_0_ujhvyj.png'
//       },
//       position: 4,
//       isProductPreview: false
//     },
//     price: {
//       type: 'float',
//       value: '159000',
//       position: 2,
//       isProductPreview: false
//     },
//     title: {
//       type: 'string',
//       value: 'Apple iPhone 15',
//       position: 0,
//       isProductPreview: false
//     },
//     category: {
//       type: 'string',
//       value: 'Mobile & Mobile Accessories',
//       position: 8,
//       isProductPreview: false
//     },
//     subimage: {
//       type: 'groupOfImages',
//       value: [
//         {
//           size: 832836,
//           filename: 'files/project/page/9/images/300826_0_ujhvyj.png',
//           previewLink: '',
//           downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/images/300826_0_ujhvyj.png'
//         },
//         {
//           size: 536790,
//           filename: 'files/project/page/9/images/300826_13_bdb4g1.png',
//           previewLink: '',
//           downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/images/300826_13_bdb4g1.png'
//         },
//         {
//           size: 54988,
//           filename: 'files/project/page/9/images/300826_15_frbtag-(1).jpeg',
//           previewLink: '',
//           downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/images/300826_15_frbtag-(1).jpeg'
//         },
//         {
//           size: 119113,
//           filename: 'files/project/page/9/images/300826_15_frbtag.jpeg',
//           previewLink: '',
//           downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/images/300826_15_frbtag.jpeg'
//         },
//         {
//           size: 324204,
//           filename: 'files/project/page/9/images/300826_4_ij1vgh.png',
//           previewLink: '',
//           downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/images/300826_4_ij1vgh.png'
//         },
//         {
//           size: 304321,
//           filename: 'files/project/page/9/images/300826_5_knduzl.png',
//           previewLink: '',
//           downloadLink: 'https://ecommerce.oneentry.cloud/cloud-static/files/project/page/9/images/300826_5_knduzl.png'
//         }
//       ],
//       position: 5,
//       isProductPreview: false
//     }
//     keyfeatures: {
//       type: 'string',
//       value: 'Display: 6.7 inches (17 cm), Super Retina XDR Display, 120 Hz Refresh Rate // Memory: 256GB ROM // Processor: Apple A17 Pro Chip, Hexa Core // Camera: 48 MP + 12 MP + 12 MP Triple Rear & 12 MP Front Camera // Battery: 15W MagSafe Wireless Charging // USP: ProMotion Technology // Cinematic Video Stabilisation',
//       position: 7,
//       isProductPreview: false
//     },
//     dealoftheday: { type: 'integer', value: '1', position: 9, isProductPreview: false },
//     discountedprice: {
//       type: 'float',
//       value: '151490',
//       position: 6,
//       isProductPreview: false
//     }
//   }
//   isVisible: true
// }
