"use client";

import useAddCategory from "@/app/_hooks/useAddCategory";
import useUpdateCategory from "@/app/_hooks/useUpdateCategory";
import { categorySchema, CategorySchema } from "@/app/_schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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

      <Controller
        name={"image"}
        control={control}
        render={({ field: { onChange } }) => (
          <Input
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files?.[0]) {
                uploadFileMutation.mutate(event.target.files[0], {
                  onSuccess: (filePath) => {
                    onChange(filePath);
                  },
                });
              }
            }}
            sx={{
              "&:before": {
                borderBottom: 0,
                outline: 0,
              },
            }}
            slotProps={{
              input: {
                accept: "image/*",
                disabled: uploadFileMutation.isPending,
              },
            }}
          />
        )}
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
