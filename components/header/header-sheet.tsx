"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenuOutline } from "react-icons/io5";
import { X } from "lucide-react";

const HeaderSheet = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleMenu = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <Sheet open={toggle} onOpenChange={setToggle}>
      <SheetTrigger onClick={toggleMenu}>
        {toggle ? <X size={25} /> : <IoMenuOutline size={25} />}
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className={`mt-20 bg-primary-dark rounded-lg ${toggle ? "block" : "hidden"} pointer-events-none`}
      >
        <SheetHeader>
          <SheetTitle className="text-primary-txt font-bold text-2xl">
            Shop by Category
          </SheetTitle>
          <SheetDescription className="text-primary-txt">
            <div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Mobiles
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Air Conditioners
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Televisons
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Laptops
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Headphones & Earphones
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Coolers
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Home Theatres & Soundbars
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Mobiles
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export { HeaderSheet };
