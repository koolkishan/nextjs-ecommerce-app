"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Profile = () => {
  const { setOpenModal } = useAppStore();
  const router = useRouter();
  const user = useAuthUser();
  console.log("🚀 ~ Profile ~ user :", user);

  const handleClick = (action: string) => {
    if (action === "login") {
      console.log('first')
      router.push("/my-account");
      setOpenModal(true);
    } else {
      console.log('second')
      signOut();
    }
  };

  useEffect(()=> {

  },[])

  return (
    <div>
      <div>
        <p>My Profile</p>
      </div>
      <div>
        <p>My Address</p>
      </div>
      <div>
        <p>My Orders</p>
      </div>
      <div>
        <p>My Wishlist</p>
      </div>
      <div>
        {!user ? (
          <p className="cursor-pointer" onClick={() => handleClick("login")}>
            Login
          </p>
        ) : (
          <p className="cursor-pointer" onClick={() => handleClick("logout")}>
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
