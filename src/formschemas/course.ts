import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  priority: z.coerce.string().default("0"),
  universityId: z.string().optional(),
  qualification: z.string().optional(),
  earliestIntake: z.string().optional(),
  deadline: z.string().optional(),
  duration: z.string().optional(),
  entryScore: z.coerce.number().optional(),
  fee: z.coerce.string().optional(),
  scholarship: z.string().optional(),
  overview: z.string().optional(),
  category: z.string().optional(),
  tags:z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
});