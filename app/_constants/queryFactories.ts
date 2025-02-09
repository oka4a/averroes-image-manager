import { queryOptions } from "@tanstack/react-query";
import { getCategories, getCategory } from "../_services/commentsApi";

export const categoryQueries = {
  all: () =>
    queryOptions({
      queryKey: ["cateogies"],
      queryFn: getCategories,
    }),
  byId: (id: number) =>
    queryOptions({
      queryKey: ["cateogies", id],
      queryFn: () => getCategory(id),
    }),
};
