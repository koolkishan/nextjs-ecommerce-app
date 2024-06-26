import { ProductTypes } from "@/types";
import { Address, User } from "@prisma/client";
import { StateCreator } from "zustand";
export interface EcommerceAppSliceTypes {
  openModal?: boolean;
  setOpenModal: (data: boolean) => void;
  productCarouselImage?: string;
  setProductCarouselImage: (data: string) => void;
  searchTerm? :string;
  setSearchTerm: (data: string) => void;
  filterProduct: ProductTypes[];
  setFilterProduct: (data: ProductTypes[]) => void;
  compareProduct: ProductTypes[];
  setCompareProduct: (data: ProductTypes[]) => void;
  addToCartProduct: ProductTypes[];
  setAddToCartProduct: (data: ProductTypes[]) => void;
  compareLimitExceeded?: boolean;
  setCompareLimitExceeded: (data: boolean) => void;
  userDetails?: User | null;
  setUserDetails: (data: User) => void;
  userAddress?: Address | null;
  setUserAddress: (data: Address) => void;
}
const createEcommerceAppSlice: StateCreator<EcommerceAppSliceTypes> = (set, get) => ({
  openModal: false,
  setOpenModal: (open: boolean) => {
    set({ openModal: open });
  },
  productCarouselImage: 'null',
  setProductCarouselImage: (image: string ) => {
    set({ productCarouselImage: image });
  },
  searchTerm:'',
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },
  filterProduct:[],
  setFilterProduct: (products: ProductTypes[]) => {
    set({ filterProduct: products });
  },
  compareProduct:[],
  setCompareProduct: (products: ProductTypes[]) => {
    set({ compareProduct: products });
  },
  compareLimitExceeded: false,
  setCompareLimitExceeded: (open: boolean) => {
    set({ compareLimitExceeded: open });
  },
  addToCartProduct:[],
  setAddToCartProduct: (products: ProductTypes[]) => {
    set({ addToCartProduct: products });
  },
  userDetails: null,
  setUserDetails: (user: User) => {
    set({ userDetails: user });
  },
  userAddress: null,
  setUserAddress: (address: Address) => {
    set({ userAddress: address });
  },
});

export { createEcommerceAppSlice };
