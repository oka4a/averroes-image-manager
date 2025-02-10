import { z } from "zod";

export const categorySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  image: z.string({ required_error: "Image is required" }),
  description: z.string().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
