import { z } from "zod";

export const blogFormSchema = z.object({
  priority: z.coerce.string().min(1,({message:"Priority is required"})),
  title: z
    .string()
    .min(2, { message: "Blog title name must be at least 2 characters." })
    .max(100, { message: "Blog title must be at most 20 characters." }),
  slug: z.string(), 
  category:z.string(), 
  content:z
    .string().optional(),     
  // images:z.array(z.instanceof(File)), // Ensures the field is an array of File objects
  tags:z.string(),
});