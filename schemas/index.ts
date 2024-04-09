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