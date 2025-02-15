"use client";

import useAddCategory from "@/app/_hooks/useAddCategory";
import useUpdateCategory from "@/app/_hooks/useUpdateCategory";
import { categorySchema, CategorySchema } from "@/app/_schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ImageUploadField from "../shared/ImageUploadField";
import RHFTextField from "../shared/RHFTextField";

interface Props {
  category?: ICategory;
  formMode: "create" | "edit";
  afterSubmit?: () => void;
  onCancel?: () => void;
}
const UpdateCategoryForm = (props: Props) => {
  const { category, formMode, afterSubmit, onCancel } = props;
  const { mutate: addCategory, isPending: isAddingCategory } = useAddCategory({
    afterSuccess: afterSubmit,
  });
  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateCategory({
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
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    values: category,
  });

  const onSubmit = (data: CategorySchema) => {
    if (formMode === "edit" && category) {
      updateCategory({ id: category.id, data });
    } else {
      addCategory(data);
    }
  };

  const isPending = isAddingCategory || isUpdatingCategory;

  return (
    <Stack
      component="form"
      gap={1}
      py={4}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImageUploadField name="image" control={control} />

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
        label="Description"
        name="description"
        control={control}
        textFieldProps={{
          error: !!errors.description,
          helperText: errors.description?.message ?? " ",
        }}
      />

      <Stack direction="row" justifyContent="center" gap={4} mt={2}>
        <Button onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          loading={isPending}
          disabled={uploadFileMutation.isPending}
        >
          {formMode === "edit" ? "Update Category" : "Add Category"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UpdateCategoryForm;
