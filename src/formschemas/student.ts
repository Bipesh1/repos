import { z } from "zod";

export const studentSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((value) => {
      const invalidEmailPattern = /^\d+\.?\d*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
      return !invalidEmailPattern.test(value);
    }, "Email cannot be in the format of numbers followed by a dot."),
  mobile: z.coerce.string(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  role: z.literal("user").default("user"),
  category: z.string().optional().default("none"),
  dob: z.date().optional().nullable(),
  maritalStatus: z.string().optional(),
  workExp: z.string().optional(),
  university: z.string().optional(),
  counselor: z.string().optional(),
  wishlist: z.string().optional(),
  isVerified: z.boolean().default(false),
  mailVerificationToken: z.string().optional(),
  tests:z.string().optional(),
  gpa: z.string().optional(),
  link: z.string().optional(),
  passwordChangedAt: z.date().optional(),
  passwordResetToken: z.string().optional().nullable(),
  passwordResetExpires: z.date().optional().nullable()
});

export type StudentInput = z.infer<typeof studentSchema>;