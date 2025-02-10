import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { categoryQueries } from "../_constants/queryFactories";
import { addCategory } from "../_services/commentsApi";

interface MutateCategoryOptions
  extends UseMutationOptions<
    unknown,
    unknown,
    Parameters<typeof addCategory>[0]
  > {
  afterSuccess?: () => void;
}
const useAddCategory = (mutateOptions?: MutateCategoryOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategory,
    ...mutateOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(categoryQueries.all());

      mutateOptions?.afterSuccess?.();
    },
  });
};

export default useAddCategory;
