"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ConfirmEmailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useTransition } from "react";
import { verificationAction } from "@/actions/verification-token";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { resendOtp } from "@/actions/resend-otp";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { login } from "@/actions/login";

interface OtpInputProps {
  email: string | null | undefined;
}

const OtpInput = ({ email }: OtpInputProps) => {
  const router = useRouter();
  const { setOpenModal } = useAppStore();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ConfirmEmailSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ConfirmEmailSchema>) {
    if (email) {
      setError("");
      setSuccess("");

      startTransition(() => {
        verificationAction(values, email, true)
          .then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          })
          .catch((error) => {
            setError("An error occurred while verifying the OTP.");
            console.error(error);
          });
        const value = {
          email,
        };
        login(value).then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
          if (data?.success) {
            form.reset();
          }
        });
      });
    }
  }

  async function resendOtpthroughMail(email: string | null | undefined) {
    try {
      if (email) {
        const response = await resendOtp(email);
        if (response?.success) {
          setSuccess(response.success);
        } else {
          setError(response?.error);
        }
      }
    } catch (error) {
      console.log("🚀 ~ resendOtpthroughMail ~ error:", error);
      console.log("error while sending otp");
    }
  }

  const isConfirmationFormLoading = form.formState.isSubmitting;
  const isConfirmationFormValid = form.formState.isValid;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <p className="my-4 text-center font-bold uppercase text-primary-txt">
                  Verify with otp
                </p>
                <FormLabel className="my-4 block text-center text-primary-txt">
                  sent to {email}
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="">
                    <div className="my-4 flex w-full justify-center text-primary-txt">
                      <div>
                        <InputOTPGroup className="border-gray-500 bg-transparent outline-none">
                          <InputOTPSlot
                            index={0}
                            className="border-gray-500 bg-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={1}
                            className="border-gray-500 bg-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={2}
                            className="border-gray-500 bg-transparent outline-none"
                          />
                        </InputOTPGroup>
                      </div>
                      <div>
                        <InputOTPSeparator className="mt-2" />
                      </div>
                      <div>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="border-gray-500 bg-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={4}
                            className="border-gray-500 bg-transparent outline-none"
                          />
                          <InputOTPSlot
                            index={5}
                            className="border-gray-500 bg-transparent outline-none"
                          />
                        </InputOTPGroup>
                      </div>
                    </div>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            className="w-full bg-primary-btn py-6 text-base font-medium text-black"
            disabled={!isConfirmationFormValid || isConfirmationFormLoading}
          >
            {isConfirmationFormLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm font-medium text-primary-txt">
        {`Didn't Receive Your OTP?`}{" "}
        <Button
          variant={"link"}
          onClick={() => {
            resendOtpthroughMail(email);
          }}
          className="text-secondary-txt cursor-pointer font-bold underline"
        >
          Resend code
        </Button>
      </div>
    </>
  );
};

export default OtpInput;
