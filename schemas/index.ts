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

export const updateProfileSchema = z.object({
  title: z.string().optional(),
  fName: z.string().optional(),
  mName: z.string().optional(),
  lName: z.string().optional(),
  gender: z.string().optional(),
  emailid: z.string().email().min(1, {
    message: "Email is required.",
  }),
});


export const updateAddressSchema = z.object({
  userId: z.string().optional(), 
  mobileno: z.string().min(1, {
    message: "Mobile Number is required.",
  }), 
  addressNickName: z.string().min(1, {
    message: "Address Nick Name is required.",
  }), 
  pincode: z.string().min(1, {
    message: "Pincode is required.",
  }), 
  flateNOBuildingNOCompanyStreet: z.string().optional(), 
  landMark: z.string().min(1, {
    message: "LandMark is required.",
  }), 
  localitySectorArea: z.string().min(1, {
    message: "Locality/Sector/Area is required.",
  }), 
  state: z.string().min(1, {
    message: "State is required.",
  }), 
  city: z.string().min(1, {
    message: "City is required.",
  }), 
  addressType: z.string().min(1, {
    message: "Address Type is required.",
  }), 
});

export const reviewSchema = z.object({
  reviewDescription: z.string().min(1, {
    message: "Review is required.",
  }),
  rating: z
    .string()
    .min(1, {
      message: "Rating must be at least 1.",
    })
    .max(5, {
      message: "Rating must be at most 5.",
    })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5;
      },
      {
        message:
          "Rating must be a number between 1 and 5, with up to one decimal place.",
      }
    )
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        
        const isIntegerOrOneDecimalPlace =
          Number.isInteger(parsedValue) || (parsedValue * 10) % 10 === 0;
        return isIntegerOrOneDecimalPlace;
      },
      {
        message:
          "Rating must be a whole number or a floating point value with up to one decimal place between 1 and 5.",
      }
    ),
});
