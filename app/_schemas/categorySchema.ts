import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
