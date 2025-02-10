import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { categoryQueries } from "../_constants/queryFactories";
import { updateCategory } from "../_services/commentsApi";
import { enqueueSnackbar } from "notistack";

interface MutateCategoryOptions
  extends UseMutationOptions<
    unknown,
    unknown,
    Parameters<typeof updateCategory>[0]
  > {
  afterSuccess?: () => void;
}
const useUpdateCategory = (mutateOptions?: MutateCategoryOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: updateCategory,
    ...mutateOptions,
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ ...categoryQueries.all(), exact: true });
      queryClient.invalidateQueries(categoryQueries.byId(data.id));

      mutateOptions?.afterSuccess?.();

      enqueueSnackbar({ message: "Category updated", variant: "success" });
    },
  });
};

export default useUpdateCategory;
