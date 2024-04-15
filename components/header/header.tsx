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

const Header = () => {
  const router = useRouter();
  //   const { setOpenModal } = useAppStore();

  const handleClick = () => {
    // router.push('/my-account')
    // setOpenModal(true);
  };
  return (
    <>
      <div className="flex w-full items-center py-6  lg:container px-6 lg:px-0 text-primary-txt ">
        <div className="flex w-[80%] md:w-[60%] lg:w-[70%]">
          <h1 className="hidden md:block md:text-5xl md:mr-10 lg:mr-32">ABC</h1>
          <div className="flex items-center mr-4 md:mr-[5%] lg:mr-[10%]">
            <HeaderSheet />
            <p className="hidden text-base font-bold md:block">Menu</p>
          </div>
          <div className="block mt-1 text-3xl md:hidden text-center">
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
                  onClick={handleClick}
                />
              }
              hoverContent={<Profile />}
            />
            <IoCart size={22} className="mr-4 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="block text-primary-white relative md:hidden lg:container lg:px-0 px-6">
        <Search />
      </div>
    </>
  );
};

export default Header;
