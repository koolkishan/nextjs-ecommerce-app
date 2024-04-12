"use client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { CircleUserRound, NotebookTabs, Heart, Power } from "lucide-react";

const Profile = () => {
  const { setOpenModal } = useAppStore();
  const router = useRouter();
  const user = useAuthUser();
  console.log("🚀 ~ Profile ~ user :", user);

  const handleClick = () => {
    if (!user) {
      console.log("first");
      router.push("/my-account");
      setOpenModal(true);
    } else {
      console.log("second");
      signOut();
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="my-3">
      <div className="mb-6">
        <div className="flex  ">
          <CircleUserRound size={30} className="mr-4 " />
          <div>
            <p
              className="cursor-pointer text-xl font-medium"
              onClick={() => handleClick()}
            >
              My Profile
            </p>
            <p>Edit your basic details.</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex  ">
          <NotebookTabs size={30} className="mr-4 " />
          <div>
            <p className="cursor-pointer text-xl font-medium">My Address</p>
            <p>Manage your saved address</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex ">
          <Heart size={30} className="mr-4 " />
          <div>
            <p className="cursor-pointer text-xl font-medium">My WhishList</p>
            <p>Have a look at your favourite products</p>
          </div>
        </div>
      </div>

      {/* <div className="mb-6">
        <p>My Orders</p>
      </div> */}
      <div className="">
        {!user ? (
          <div className="flex">
            <Power size={28} className="mr-4 " />
            <p
              className=" cursor-pointer text-xl font-medium"
              onClick={() => handleClick()}
            >
              Login
            </p>
          </div>
        ) : (
          <p
            className=" cursor-pointer text-xl font-medium"
            onClick={() => handleClick()}
          >
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
