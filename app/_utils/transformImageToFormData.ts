import { ImageSchema } from "../_schemas/imageSchema";

function transformImageToFormData(image: IImage): ImageSchema {
  return {
    ...image,
    size: parseFloat(image.metadata.size).toString(), // ex: "3.5MB" => 3.5
    resolution: image.metadata.resolution,
  };
}

export default transformImageToFormData;
