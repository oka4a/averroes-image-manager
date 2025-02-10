import { ImageSchema } from "../_schemas/imageSchema";

function transformImageSchemaToPayload(
  image: ImageSchema,
): Omit<IImage, "id" | "uploadDate"> {
  return {
    name: image.name,
    categoryId: image.categoryId,
    url: image.url,
    metadata: {
      size: `${image.size}MB`,
      resolution: image.resolution,
    },
  };
}

export default transformImageSchemaToPayload;
