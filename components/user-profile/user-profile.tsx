"use client";

import { updateProfileSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { updateUserDetails } from "@/actions/update-user";

const UserProfile = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { userDetails } = useAppStore();

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      title: userDetails?.title ? userDetails.title : "",
      fName: userDetails?.firstName ? userDetails.firstName : "",
      mName: userDetails?.middleName ? userDetails.middleName : "",
      lName: userDetails?.lastName ? userDetails.lastName : "",
      gender: userDetails?.gender ? userDetails.gender : "",
      emailid: userDetails?.email ? userDetails.email : "",
    },
  });
  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    // console.log(values);
    setError("");
    setSuccess("");
    startTransition(async () => {
      if (userDetails?.email) {
        const { error, success } = await updateUserDetails(
          values,
          userDetails?.email
        );
        if (error) {
          setError(error);
        } else {
          setSuccess(success);
          router.push("/");
        }
      }
    });
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <div className="text-primary-white w-full ">
      <div className="my-8 text-3xl font-bold ">
        <p>My Profile Page</p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div>
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="my-5">
                      <FormLabel className="text-xl font-medium my-2">
                        Title
                      </FormLabel>
                      <FormControl>
                        {/* <Input
                          disabled={isLoading}
                          className="py-7 text-lg bg-transparent outline-none border-gray-500"
                          placeholder="Enter your Email Id"
                          {...field}
                        /> */}
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="py-7 text-lg bg-transparent outline-none border-gray-500">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent className="py-7 text-primary-white text-lg bg-secondary-dark outline-none border-gray-500">
                            <SelectItem className="text-xl" value="Mr">
                              Mr
                            </SelectItem>
                            <SelectItem className="text-xl" value="Mrs">
                              Mrs
                            </SelectItem>
                            <SelectItem className="text-xl" value="Miss">
                              Miss
                            </SelectItem>
                            <SelectItem className="text-xl" value="Ms">
                              Ms
                            </SelectItem>
                            <SelectItem className="text-xl" value="Prof">
                              Prop
                            </SelectItem>
                            <SelectItem className="text-xl" value="Dr">
                              Dr
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fName"
                  render={({ field }) => (
                    <FormItem className="my-5">
                      <FormLabel className="text-xl font-medium my-2">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="py-7 text-lg bg-transparent outline-none border-gray-500"
                          placeholder="Enter your First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="mName"
                  render={({ field }) => (
                    <FormItem className="my-5">
                      <FormLabel className="text-xl font-medium my-2">
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="py-7 text-lg bg-transparent outline-none border-gray-500"
                          placeholder="Enter your Middle Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lName"
                  render={({ field }) => (
                    <FormItem className="my-5">
                      <FormLabel className="text-xl font-medium my-2">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="py-7 text-lg bg-transparent outline-none border-gray-500"
                          placeholder="Enter your Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="my-5">
                      <FormLabel className="text-xl font-medium my-2">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="py-7 text-lg bg-transparent outline-none border-gray-500">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent className="py-7 text-primary-white text-lg bg-secondary-dark outline-none border-gray-500">
                            <SelectItem className="text-xl" value="Mr">
                              Female
                            </SelectItem>
                            <SelectItem className="text-xl" value="Mrs">
                              Male
                            </SelectItem>
                            <SelectItem className="text-xl" value="Miss">
                              Transgender
                            </SelectItem>
                            <SelectItem className="text-xl" value="Ms">
                              {`I'd rathernot say`}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailid"
                  render={({ field }) => (
                    <FormItem className="my-5">
                      <FormLabel className="text-xl font-medium my-2">
                        Email Id
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="py-7 text-lg bg-transparent outline-none border-gray-500"
                          placeholder="Enter your emailid"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-10 bg-primary-btn hover:bg-primary-btn text-black"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
