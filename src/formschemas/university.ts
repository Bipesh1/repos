import { z } from "zod";

export const universityFormSchema = z.object({
  priority: z.coerce.string(), // Keep as string (backend handles conversion)
  name: z.string().min(2, "University name is required"),
  slug: z.string().min(2, "Slug is required"),
  countryId: z.string().min(1, "Country is required"), // Ensure countryId is required
  category: z.string().optional(),
  address: z.string().optional(),
  link: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  fb: z.string().optional(),
  insta: z.string().optional(),
  x: z.string().optional(),
  phone: z.string().optional(),
  syllabus: z.string().optional(),
  estdDate: z.string().optional(), // Keep as string (backend handles conversion)
  deamMsg: z.string().optional(),
  scholarship: z.string().optional(),
  content: z.string().optional(),
  test: z.string().optional(), // Added missing field
  applyfee: z.string().optional(), // Added missing field
  imageAlt: z.string().optional(),
  tags: z.string().optional(), // Keep as string (backend handles conversion)
  admissionOpen: z.coerce.string().optional(), // Add missing field
});
