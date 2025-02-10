import { z } from "zod";

export const imageSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.string(),
  resolution: z.string(),
  categoryId: z.number(),
});

export type ImageSchema = z.infer<typeof imageSchema>;
