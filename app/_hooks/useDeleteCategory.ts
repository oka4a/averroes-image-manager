import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { categoryQueries } from "../_constants/queryFactories";
import { deleteCategory } from "../_services/commentsApi";

interface MutateCategoryOptions
  extends UseMutationOptions<
    unknown,
    unknown,
    Parameters<typeof deleteCategory>[0]
  > {
  afterSuccess?: () => void;
}
const useDeleteCategory = (mutateOptions?: MutateCategoryOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategory,
    ...mutateOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ ...categoryQueries.all(), exact: true });

      mutateOptions?.afterSuccess?.();

      enqueueSnackbar({ message: "Category deleted", variant: "success" });
    },
  });
};

export default useDeleteCategory;
