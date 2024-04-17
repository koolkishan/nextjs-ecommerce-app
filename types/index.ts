export interface DealOfTheDayTypes {
    id: number;
    name: string;
    price: number;
    image: string;
    discountedPrice: number;
    rate: number;
    totalRating: number;
    totalReview: number;
    keyFeatures?: (string)[] | null;
    category: string;
    dealoftheday:  number;
  }

  export interface ProductTypes {
    id: number;
    title: string;
    name: string;
    price: number;
    brand: string;
    image: string;
    discountedPrice: number;
    rate: number;
    totalRating: number;
    totalReview: number;
    keyFeatures?: (string)[] | null;
    category: string;
    dealoftheday:  number;

  }
  
  