"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { createAccountSchema } from "@/schemas";
import { createAccount } from "@/actions/create-account";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import OtpInput from "../otp-Input/otp-input";

const CreateAccountForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [otp, setOtp] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>();

  const form = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      // userName: '',
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createAccountSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      setEmail(values.email);
      const { error, success } = await createAccount(values);
      if (error) {
        setError(error);
      } else {
        setOtp(true);
        setSuccess(success);
      }
    });
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      {!otp ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-5">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="border-gray-500 bg-transparent outline-none"
                      placeholder="Enter your Email Id"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isLoading}
              className="w-full bg-primary-btn text-black hover:bg-primary-btn"
            >
              Continue
            </Button>
          </form>
        </Form>
      ) : (
        <div>
          <OtpInput email={email} />
        </div>
      )}
    </div>
  );
};

export { CreateAccountForm };
