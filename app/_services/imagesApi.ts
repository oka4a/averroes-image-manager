import { ImageSchema } from "../_schemas/imageSchema";
import { fetchApi } from "../_utils/fetchApi";

const IMAGES_ENDPOINT = "images";

export async function getImages() {
  const images = fetchApi<IImage[]>(`/${IMAGES_ENDPOINT}`);

  return images;
}

export async function getImage(id?: number) {
  if (!id) return undefined;
  const image = fetchApi<IImage>(`/${IMAGES_ENDPOINT}/${id}`);

  return image;
}

export async function addImage(data: ImageSchema) {
  const image = fetchApi<IImage>(`/${IMAGES_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return image;
}

interface UpdateImage {
  id: number;
  data: Partial<ImageSchema>;
}
export async function updateImage({ id, data }: UpdateImage) {
  const image = fetchApi<IImage>(`/${IMAGES_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return image;
}

export async function deleteImage(id: number) {
  return fetchApi<Promise<void>>(`/${IMAGES_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}
