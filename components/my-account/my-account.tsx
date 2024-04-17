"use client";

import { findAddressByUserId } from "@/data-access/address";
import { findUserByEmail } from "@/data-access/user";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAppStore } from "@/store";
import { CircleUserRound, NotebookTabs } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyAccount = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { setOpenModal, setUserDetails, setUserAddress } = useAppStore();

  const user = useAuthUser();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handleClick = async (section: string) => {
    // const fetchUserDetails = async () => {
    if (user && user.email && user.id) {
      try {
        const userDetails = await findUserByEmail(user.email);
        if (userDetails) setUserDetails(userDetails);
        const userAddressDetails = await findAddressByUserId(user.id);
        if (userAddressDetails) setUserAddress(userAddressDetails);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
    // };
    // fetchUserDetails();
    if (section === "profile") {
      router.push("/my-account/my-profile");
    }
    if (section === "address") {
      router.push("/my-account/my-address");
    }
  };
  return (
    <div className="w-full h-full text-primary-white px-6 lg:px-0 lg:container">
      <div className="w-full h-[100px] grid content-center">
        <p className="text-3xl font-medium">My Account</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-4 w-full  content-center">
        <div className="my-4 mb border border-primary-white flex items-center bg-secondary-dark py-2 px-4 rounded-lg w-full">
          <CircleUserRound
            size={32}
            className="mr-2"
            aria-label="My Profile Icon"
          />
          <p className="text-lg">
            <div
              className="ml-2 cursor-pointer"
              onClick={() => handleClick("profile")}
            >
              <p>My Profile</p>
              <p className="text-sm ml">Edit your basic details</p>
            </div>
          </p>
        </div>
        <div className="my-4 border border-primary-white flex items-center bg-secondary-dark py-2 px-4 rounded-lg w-full">
          <NotebookTabs
            size={30}
            className="mr-2"
            aria-label="My Address Icon"
          />
          <p className="text-lg">
            <div
              className="ml-2 cursor-pointer"
              onClick={() => handleClick("address")}
            >
              <p>My Address</p>
              <p className="text-sm ml">Manage your saved address</p>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
