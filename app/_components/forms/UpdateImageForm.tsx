"use client";

import useAddImage from "@/app/_hooks/useAddImage";
import useCategoriesOptions from "@/app/_hooks/useCategoriesOptions";
import useUpdateImage from "@/app/_hooks/useUpdateImage";
import { imageSchema, ImageSchema } from "@/app/_schemas/imageSchema";
import transformImageToFormData from "@/app/_utils/transformImageToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ImageUploadField from "../shared/ImageUploadField";
import RHFTextField from "../shared/RHFTextField";

interface Props {
  image?: IImage;
  formMode: "create" | "edit";
  afterSubmit?: () => void;
  onCancel?: () => void;
}
const UpdateImageForm = (props: Props) => {
  const { image, formMode, afterSubmit, onCancel } = props;

  const { categoriesOptions, isPendingCategories } = useCategoriesOptions();

  const { mutate: addImage, isPending: isAddingImage } = useAddImage({
    afterSuccess: afterSubmit,
  });
  const { mutate: updateImage, isPending: isUpdatingImage } = useUpdateImage({
    afterSuccess: afterSubmit,
  });

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`/uploads/${file.name}`); // Simulating server response with a file path
        }, 1000);
      });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
    values: image ? transformImageToFormData(image) : undefined,
  });

  const onSubmit = (data: ImageSchema) => {
    if (formMode === "edit" && image) {
      updateImage({ id: image.id, data });
    } else {
      addImage(data);
    }
  };

  const isPending = isAddingImage || isUpdatingImage;

  console.log("errors", watch("url"));

  return (
    <Stack
      component="form"
      gap={1}
      py={4}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImageUploadField name="url" control={control} />
      <RHFTextField
        label="Name"
        name="name"
        control={control}
        textFieldProps={{
          error: !!errors.name,
          helperText: errors.name?.message ?? " ",
        }}
      />
      <RHFTextField
        name="categoryId"
        options={categoriesOptions}
        // TODO: Remove this hack :")
        label={isPendingCategories ? "Loading..." : "Category"} // a floating input
        placeholder={isPendingCategories ? "Loading.." : ""}
        disabled={isPendingCategories}
        control={control}
        textFieldProps={{
          error: !!errors.categoryId,
          helperText: errors.categoryId?.message ?? " ",
        }}
      />
      <RHFTextField
        label="Size"
        name="size"
        type="number"
        control={control}
        textFieldProps={{
          error: !!errors.size,
          helperText: errors.size?.message ?? " ",
          slotProps: {
            input: {
              endAdornment: <InputAdornment position="end">MB</InputAdornment>,
            },
          },
        }}
      />
      <RHFTextField
        label="Resolution"
        name="resolution"
        placeholder="1920x1080"
        control={control}
        textFieldProps={{
          error: !!errors.resolution,
          helperText: errors.resolution?.message ?? " ",
        }}
      />

      <Stack direction="row" justifyContent="center" gap={4} mt={2}>
        <Button onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          // TODO: disable submit on image uploading
          loading={isPending}
          disabled={uploadFileMutation.isPending}
        >
          {formMode === "edit" ? "Update Category" : "Add Category"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UpdateImageForm;
