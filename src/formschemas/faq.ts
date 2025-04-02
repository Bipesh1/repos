import { z } from "zod";

export const faqFormSchema = z.object({
  ques: z
    .string()
    .min(20, { message: "Questions must be at least 20 characters." })
    .max(2000, { message: "Questions must be at most 2000 characters." }),

  ans:z
  .string()
  .min(20, { message: "Questions must be at least 20 characters." })
  .max(2000, { message: "Questions must be at most 2000 characters." }),

  countryId: z.string(),

  
  priority:z.coerce.string().min(1,({message:"Priority is required"}))
});



