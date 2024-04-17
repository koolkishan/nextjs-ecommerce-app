import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import CompareModal from "./compare-product-modal";
interface CompareDrawerProps {
  isOpenDrawer: boolean;
  setIsOpenDrawer: Dispatch<SetStateAction<boolean>>;
}
const CompareDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
}: CompareDrawerProps) => {
  const router = useRouter();
  const { compareProduct, setCompareProduct } = useAppStore();

  const handleRemove = (id: number, index: number) => {
    const newCompareProduct = compareProduct
      .slice(0, index)
      .concat(compareProduct.slice(index + 1));
    setCompareProduct(newCompareProduct);
  };
  const handleClick = () => {
    router.push("/compare");
  };
  return (
    <div className="w-full">
      <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent className=" w-full text-primary-white bg-black border-none h-[350px] px-6 lg:container lg:px-0 ">
          <div className="flex justify-center mt-10">
            {Array.from({ length: 4 }).map((_, index) => {
              // {compareProduct.map((product, index) => {
              if (compareProduct[index]) {
                return (
                  <div
                    key={index}
                    className="flex mr-3 w-[200px]  border border-primary-gray rounded-lg"
                  >
                    <div className="bg-gray-400/20 ">
                      <div className="flex justify-end mt-3 mr-3">
                        <X
                          onClick={() =>
                            handleRemove(+compareProduct[index].id, index)
                          }
                        />
                      </div>
                      <div className="flex justify-center items-center my-3">
                        <Image
                          // src={product.imageUrl}
                          src="/deals-of-the-day/dealsOfTheDay1.png"
                          alt="Product Image"
                          width={100}
                          // onClick={() => router.push(`/product/${product.id}`)}
                          height={100}
                          style={{
                            maxWidth: "100%",
                            height: "auto"
                          }} />
                      </div>
                      <div className="text-wrap mx-4 text-sm font-medium">
                        <p className="">
                          {compareProduct[index].name.split("(")[0]}
                        </p>
                        <p className="font-bold my-3">
                          <span className="">₹ </span>
                          {Number(
                            compareProduct[index].discountedPrice
                          ).toLocaleString("us")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    onClick={() => setIsOpenDrawer((prev) => !prev)}
                    key={index}
                    className="flex justify-center items-center mr-3 w-[200px] h-[270px] border border-slate-400/70 rounded-lg"
                  >
                    <Plus />
                  </div>
                );
              }
            })}
            <div className="flex flex-col w-40 items-center justify-center">
              <div className="w-full">
                <Button
                  onClick={handleClick}
                  className="text-primary-dark bg-primary-btn w-full my-2 hover:bg-primary-btn"
                >
                  Compare
                </Button>
              </div>
              <div className="w-full">
                <DrawerClose className="w-full">
                  <Button
                    className="text-primary-txt bg-black w-full my-2 hover:bg-black"
                    variant="outline"
                    onClick={() => setIsOpenDrawer((prev) => !prev)}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <CompareModal />
    </div>
  );
};

export default CompareDrawer;
