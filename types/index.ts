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
  }
  