"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAppStore } from "@/store";
import { CreateAccountForm } from "../create-account/create-account-form";
import { LoginForm } from "../login/login-form";

const LoginModal = () => {
  const { setOpenModal, openModal } = useAppStore();

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="bg-primary-dark border-none">
        <Tabs defaultValue="login" className="w-[400px] mt-5 ml-8">
          <DialogHeader>
            <TabsList className="bg-transparent border border-gray-500 py-6">
              <TabsTrigger
                className="text-primary-txt border-none "
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                className="text-primary-txt border-none"
                value="createAccount"
              >
                Create Account
              </TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login" className="text-black">
            <LoginForm />
          </TabsContent>
          <TabsContent value="createAccount" className="text-black">
            <CreateAccountForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
