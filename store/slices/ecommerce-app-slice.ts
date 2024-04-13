import { StateCreator } from "zustand";
// import { WeatherDataTypes } from "../../types";
// import { SettingTypes } from "../../types";
export interface EcommerceAppSliceTypes {
  // weatherData?: WeatherDataTypes;
  // setWeatherData: (data: WeatherDataTypes) => void;
  // openModal?: boolean;
  // setOpenModal: (data: boolean) => void;
  // loader?: boolean;
  // setLoader: (data: boolean) => void;
  // settings: SettingTypes;
  // setSettings: (data: SettingTypes) => void;
  openModal?: boolean;
  setOpenModal: (data: boolean) => void;
  productCarouselImage?: string;
  setProductCarouselImage: (data: string) => void;
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
  // weatherData: null,
  // setWeatherData: (data: WeatherDataTypes) => {
});

export { createEcommerceAppSlice };
