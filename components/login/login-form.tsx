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
import { loginSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { resendOtp as sendOtp } from "@/actions/resend-otp";
import OtpInput from "../otp-Input/otp-input";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [otp, setOtp] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [email, setEmail] = useState<string | null>();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      // // const { error, success } = await createAccount(values);
      // // const {error, success} =
      // await login(values);
      // // if (error) {
      // //   setError(error);
      // // } else {
      // //   setOtp(true);
      // //   setSuccess(success);
      // // }
      // setEmail(values.email);
      const response = await sendOtp(values.email);
      if (response?.error) {
        setError(error);
      } else {
        setEmail(values.email);
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
                      className="bg-transparent outline-none border-gray-500"
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
              className="w-full bg-primary-btn hover:bg-primary-btn text-black"
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

export { LoginForm };
