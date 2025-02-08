import { fetchApi } from "../_utils/fetchApi";

async function getCategories() {
  const categories = fetchApi<ICategory[]>("/categories");

  return categories;
}

export default getCategories;
