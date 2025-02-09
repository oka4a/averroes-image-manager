import { fetchApi } from "../_utils/fetchApi";

export async function getCategories() {
  const categories = fetchApi<ICategory[]>("/categories");

  return categories;
}

export async function getCategory(id: number) {
  const category = fetchApi<ICategory>(`/categories/${id}`);

  return category;
}
