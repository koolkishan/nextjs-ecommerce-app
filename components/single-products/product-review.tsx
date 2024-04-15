"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reviewSchema } from "@/schemas";

const ProductReview = () => {
  const [writeReview, setWriteReview] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewDescription: "",
      rating: "", // Set a default numeric value for rating
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    try {
      setSuccess("Review submitted successfully!");
      form.reset();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  const handleClick = () => {
    setWriteReview((prev) => !prev);
  };

  return (
    <div className="px-6 lg:container lg:px-0 text-primary-txt">
      <p className="text-2xl md:text-4xl font-bold">Product Reviews</p>
      <div className="rounded-md">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index} className="bg-secondary-dark py-4 px-4 my-6">
              <p className="text-xl font-bold">John Doe</p>
              <p className="px-4">product review {index}</p>
            </div>
          );
        })}
      </div>
      <div
        className="cursor-pointer px-2 py-4 rounded-lg bg-primary-btn w-36 mb-4"
        onClick={handleClick}
      >
        <p className="text-primary-dark font-medium"> Write a Review</p>
      </div>
      {writeReview && (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-full justify-between">
                <div className="w-[70%]">
                  <FormField
                    control={form.control}
                    name="reviewDescription"
                    render={({ field }) => (
                      <FormItem className="my-5">
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-transparent outline-none border-gray-500"
                            placeholder="Write a review!"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-[30%] justify-between mx-2">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="my-5">
                        <FormControl>
                          <Input
                            step="0.1"
                            min="1"
                            max="5"
                            disabled={isLoading}
                            className="bg-transparent outline-none border-gray-500"
                            placeholder="Rating (1-5)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-btn hover:bg-primary-btn text-black mt-5"
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
