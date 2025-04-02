import { z } from "zod";

export const countryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Country name must be at least 2 characters." })
    .max(20, { message: "Country name must be at most 20 characters." }),
  
  priority: z.coerce.string().min(1, ({ message: "Priority is required" })),
  
  imagesAlt: z.string().optional(),
  
  // Public University fields
  publicUni: z.object({
    undergraduate: z.string().optional(),
    masters: z.string().optional()
  }).optional(),
  
  // Private University fields
  privateUni: z.object({
    undergraduate: z.string().optional(),
    masters: z.string().optional()
  }).optional(),
  
  // General fields
  general: z.object({
    undergraduate: z.string().optional(),
    masters: z.string().optional(),
    mba: z.string().optional()
  }).optional()
});