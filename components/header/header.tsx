/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import { HeaderSheet } from "@/components/header/header-sheet";
import { FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { HoverList } from "@/components/hover-list";
import { Profile } from "@/components/profile";
import { IoCart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import cities from "cities.json";
import Search from "./search";
import { getProducts } from "@/actions/one-entry-api-calls/one-entry";
import { ProductTypes } from "@/types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getAllProductFromCart } from "@/actions/cart";

const Header = () => {
  const router = useRouter();
  const { products, setProducts, addToCartProduct, setAddToCartProduct } =
    useAppStore();
  const user = useAuthUser();

  const handleClick = async () => {
    if (user?.id) {
      const cartProducts = await getAllProductFromCart({
        userId: user?.id,
      });
      if (cartProducts) {
        const cartFilterProducts = [];
        for (let id of cartProducts.productId) {
          const product = products.find((p) => +p.id === +id);
          cartFilterProducts.push(product);
        }
        if (cartFilterProducts) {
          const combinedCart = [...addToCartProduct, ...cartFilterProducts];
          const uniqueProducts = new Set();
          const uniqueUpdatedCart = combinedCart.filter((product) => {
            if (!uniqueProducts.has(product?.id)) {
              uniqueProducts.add(product?.id);
              return true;
            }
            return false;
          }) as ProductTypes[];
          setAddToCartProduct(uniqueUpdatedCart);
        }
      }
    }
    if (user) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        if (products) {
          setProducts(products);
        }
      } catch (error) {
        console.error("Error calling oneEntryTry:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex w-full items-center py-6  lg:container px-6 lg:px-0 text-primary-txt ">
        <div className="flex w-[80%] md:w-[60%] lg:w-[70%]">
          <h1 className="hidden md:block md:text-5xl md:mr-10 lg:mr-32">ABC</h1>
          <div className="flex items-center mr-4 md:mr-[5%] lg:mr-[10%]">
            <HeaderSheet />
            <p className="hidden text-base font-bold md:block">Menu</p>
          </div>
          <div
            className="block mt-1 text-3xl md:hidden text-center cursor-pointer"
            onClick={() => {router.push('/')}}
          >
            <p>ABC</p>
          </div>
          <div className="hidden md:block w-1/2">
            <Search />
          </div>
        </div>
        <div className="flex w-[20%] md:w-[40%] lg:w-[30%] justify-end">
          <div className="flex w-full items-center justify-end">
            <IoLocationSharp size={20} className="hidden md:block" />
            <p className="hidden md:block text-base mr-4">Mumbai, 400049</p>
            <HoverList
              hoverTrigger={
                <FaUser
                  size={18}
                  className="mr-4 cursor-pointer"
                  // onClick={handleClick}
                />
              }
              hoverContent={<Profile />}
            />
            <IoCart
              size={22}
              className="mr-4 cursor-pointer"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <div className="block text-primary-white relative md:hidden lg:container lg:px-0 px-6 mb-4">
        <Search />
      </div>
    </>
  );
};

export default Header;
