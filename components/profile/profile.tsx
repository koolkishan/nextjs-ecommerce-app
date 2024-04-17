"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import {
  CircleUserRound,
  NotebookTabs,
  Heart,
  Power,
  PowerOff,
} from "lucide-react";
import { findUserByEmail } from "@/data-access/user";
import { findAddressByUserId } from "@/data-access/address";

const Profile = () => {
  const { setOpenModal, setUserDetails, setUserAddress } = useAppStore();
  const router = useRouter();
  const user = useAuthUser();

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (user && user.email && user.id) {
  //       try {
  //         const userDetails = await findUserByEmail(user.email);
  //         if (userDetails) setUserDetails(userDetails);

  //         const userAddressDetails = await findAddressByUserId(user.id);
  //         if (userAddressDetails) setUserAddress(userAddressDetails);
  //       } catch (error) {
  //         console.error("Failed to fetch user details:", error);
  //       }
  //     }
  //   };
  //   fetchUserDetails();
  // }, []);

  const handleLogin = (action: string) => {
    if (!user) {
      // setOpenModal(true);
      router.push("/login");
    } else {
      if (action === "profile") {
        router.push("/my-account");
      } else if (action === "address") {
        router.push("/my-account/my-address");
      }
    }
    if (action === "login") {
      // setOpenModal(true);
      router.push("/login");
    }
  };

  const handleLogOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="my-3">
      {/* My Profile section */}
      <div className="mb-6">
        <div className="flex">
          <CircleUserRound size={30} className="mr-4" />
          <div>
            <p
              className="cursor-pointer text-xl font-medium"
              onClick={() => handleLogin("profile")}
            >
              My Profile
            </p>
            <p>Edit your basic details.</p>
          </div>
        </div>
      </div>

      {/* My Address section */}
      <div className="mb-6">
        <div className="flex">
          <NotebookTabs size={30} className="mr-4" />
          <div>
            <p
              className="cursor-pointer text-xl font-medium"
              onClick={() => handleLogin("address")}
            >
              My Address
            </p>
            <p>Manage your saved address</p>
          </div>
        </div>
      </div>

      {/* My Wishlist section */}
      <div className="mb-6">
        <div className="flex">
          <Heart size={30} className="mr-4" />
          <div>
            <p className="cursor-pointer text-xl font-medium">My Wishlist</p>
            <p>Have a look at your favourite products.</p>
          </div>
        </div>
      </div>

      {/* Login or Logout section */}
      <div>
        {!user ? (
          <div className="flex">
            <Power size={28} className="mr-4" />
            <p
              className="cursor-pointer text-xl font-medium"
              onClick={() => handleLogin("login")}
            >
              Login
            </p>
          </div>
        ) : (
          <div className="flex">
            <PowerOff size={28} className="mr-4" />
            <p
              className="cursor-pointer text-xl font-medium"
              onClick={handleLogOut}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
