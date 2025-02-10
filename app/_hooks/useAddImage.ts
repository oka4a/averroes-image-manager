import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { imageQueries } from "../_constants/queryFactories";
import { addImage } from "../_services/imagesApi";

interface MutateImageOptions
  extends UseMutationOptions<unknown, unknown, Parameters<typeof addImage>[0]> {
  afterSuccess?: () => void;
}
const useAddImage = (mutateOptions?: MutateImageOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addImage"],
    mutationFn: addImage,
    ...mutateOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(imageQueries.all());

      mutateOptions?.afterSuccess?.();

      enqueueSnackbar({ message: "Image added", variant: "success" });
    },
  });
};

export default useAddImage;
