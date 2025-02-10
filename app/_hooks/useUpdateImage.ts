import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { imageQueries } from "../_constants/queryFactories";
import { updateImage } from "../_services/imagesApi";

interface MutateImageOptions
  extends UseMutationOptions<
    unknown,
    unknown,
    Parameters<typeof updateImage>[0]
  > {
  afterSuccess?: () => void;
}
const useUpdateImage = (mutateOptions?: MutateImageOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateImage"],
    mutationFn: updateImage,
    ...mutateOptions,
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ ...imageQueries.all(), exact: true });
      queryClient.invalidateQueries(imageQueries.byId(data.id));

      mutateOptions?.afterSuccess?.();

      enqueueSnackbar({ message: "Image updated", variant: "success" });
    },
  });
};

export default useUpdateImage;
