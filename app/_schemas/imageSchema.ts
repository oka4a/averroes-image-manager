import { z } from "zod";

export const imageSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  url: z.string({ required_error: "Image is required" }),
  size: z
    .string({ required_error: "Size is required" })
    .regex(/^\d+(\.\d+)?$/, "Size must be a valid number"),
  resolution: z
    .string({ required_error: "Resolution is required" })
    .regex(/^\d+x\d+$/, "Resolution must be in WIDTHxHEIGHT format"),
  categoryId: z.number({ required_error: "Category is required" }),
});

export type ImageSchema = z.infer<typeof imageSchema>;
