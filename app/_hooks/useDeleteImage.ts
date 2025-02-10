import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { imageQueries } from "../_constants/queryFactories";
import { deleteImage } from "../_services/imagesApi";

interface MutateImageOptions
  extends UseMutationOptions<
    unknown,
    unknown,
    Parameters<typeof deleteImage>[0]
  > {
  afterSuccess?: () => void;
}
const useDeleteImage = (mutateOptions?: MutateImageOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: deleteImage,
    ...mutateOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ ...imageQueries.all(), exact: true });

      mutateOptions?.afterSuccess?.();

      enqueueSnackbar({ message: "Image deleted", variant: "success" });
    },
  });
};

export default useDeleteImage;
