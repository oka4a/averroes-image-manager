import { queryOptions } from "@tanstack/react-query";
import { getCategories, getCategory } from "../_services/commentsApi";
import { getImage, getImages } from "../_services/imagesApi";

export const categoryQueries = {
  all: () =>
    queryOptions({
      queryKey: ["cateogies"],
      queryFn: getCategories,
    }),
  byId: (id?: number) =>
    queryOptions({
      queryKey: ["cateogies", id],
      queryFn: () => getCategory(id),
    }),
};

export const imageQueries = {
  all: () =>
    queryOptions({
      queryKey: ["images"],
      queryFn: getImages,
    }),
  byId: (id?: number) =>
    queryOptions({
      queryKey: ["images", id],
      queryFn: () => getImage(id),
    }),
};
