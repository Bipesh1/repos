import { z } from "zod";

export const adminFormSchema = z.object({
  adminName: z.string().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((value) => {
      const invalidEmailPattern = /^\d+\.?\d*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
      return !invalidEmailPattern.test(value);
    }, "Email cannot be in the format of numbers followed by a dot."),
  mobile: z.coerce.string().length(10, "Mobile number must be 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  role: z.literal("admin"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type AdminInput = z.infer<typeof adminFormSchema>;