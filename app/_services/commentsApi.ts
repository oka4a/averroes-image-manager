import { CategorySchema } from "../_schemas/categorySchema";
import { fetchApi } from "../_utils/fetchApi";

export async function getCategories() {
  const categories = fetchApi<ICategory[]>("/categories");

  return categories;
}

export async function getCategory(id?: number) {
  if (!id) return undefined;
  const category = fetchApi<ICategory>(`/categories/${id}`);

  return category;
}

export async function addCategory(data: CategorySchema) {
  const category = fetchApi<ICategory>(`/categories`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return category;
}

interface UpdateCategory {
  id: number;
  data: CategorySchema;
}
export async function updateCategory({ id, data }: UpdateCategory) {
  const category = fetchApi<ICategory>(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return category;
}

export async function deleteCategory(id: number) {
  return fetchApi<Promise<void>>(`/categories/${id}`, {
    method: "DELETE",
  });
}
