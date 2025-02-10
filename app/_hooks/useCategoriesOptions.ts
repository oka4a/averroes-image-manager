import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "../_constants/queryFactories";

const useCategoriesOptions = () => {
  const { data: categories, isPending: isPendingCategories } = useQuery(
    categoryQueries.all(),
  );

  const categoriesOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return {
    categoriesOptions,
    isPendingCategories,
  };
};

export default useCategoriesOptions;
