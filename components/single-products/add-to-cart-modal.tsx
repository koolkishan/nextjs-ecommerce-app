"use client";
import { useAppStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ProductTypes } from "@/types";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getAllProductFromCart } from "@/actions/cart";
import { getProductFromId } from "@/actions/one-entry-api-calls/one-entry";
interface AddToCartModalProps {
  product?: ProductTypes;
}
const AddToCartModal = ({ product }: AddToCartModalProps) => {
  const {
    openModal,
    setOpenModal,
    products,
    setAddToCartProduct,
    addToCartProduct,
  } = useAppStore();
  const router = useRouter();
  const user = useAuthUser();
  const handleProceedToCart = async () => {
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
        console.log(cartFilterProducts, ":???");
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
  if (product) {
    return (
      <div className="w-full text-primary-txt">
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="bg-primary-dark border-none lg:w-[100%]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                1 Item added to the cart!
              </DialogTitle>
              <DialogDescription className="w-full">
                <div className="md:flex md:justify-center md:items-center my-4 pb-4 border-b">
                  <div className="flex justify-center items-center">
                    <Image
                      src={product?.image}
                      alt="singleproduct"
                      width={300}
                      height={300}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="text-primary-txt text-lg md:text-base mx-4  ">
                    {product?.name}
                  </div>
                  <div className="">
                    <p className="text-center md:flex md:item-center text-lg text-primary-txt font-bold">
                      <IndianRupee className="inline mt-1" size={20} />
                      {Number(product?.discountedPrice).toLocaleString("us")}
                    </p>
                    <p className="text-center text-sm md:flex md:items-center text-primary-gray line-through mx-2">
                      <span className="text-xl">₹</span>
                      {Number(product?.price).toLocaleString("us")}
                    </p>
                  </div>
                </div>
              </DialogDescription>
              <Button
                className="bg-primary-btn hover:bg-primary-btn text-primary-dark"
                onClick={() => {
                  handleProceedToCart();
                }}
              >
                Proceeed To Cart
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};

export default AddToCartModal;
