import * as z from "zod";

export const createAccountSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required."
    })

  });

export  const loginSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required."
    })
  });

  export const ConfirmEmailSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  export const reviewSchema = z.object({
    reviewDescription: z.string().min(1, {
      message: 'Review is required.'
    }),
    rating: z.string().min(1, {
      message: 'Rating must be at least 1.'
    }).max(5, {
      message: 'Rating must be at most 5.'
    }).refine(value => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5;
    }, {
      message: 'Rating must be a number between 1 and 5, with up to one decimal place.',
    }).refine(value => {
      const parsedValue = parseFloat(value);
      // Check for the floating-point condition, allowing up to one decimal place
      const isIntegerOrOneDecimalPlace = Number.isInteger(parsedValue) || (parsedValue * 10) % 10 === 0;
      return isIntegerOrOneDecimalPlace;
    }, {
      message: 'Rating must be a whole number or a floating point value with up to one decimal place between 1 and 5.',
    }),
  });
  