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
          <SheetTitle className="text-primary-txt">Shop by Category</SheetTitle>
          <SheetDescription className="text-primary-txt">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export { HeaderSheet };
