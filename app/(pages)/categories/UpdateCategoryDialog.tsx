"use client";

import UpdateCategoryForm from "@/app/_components/forms/UpdateCategoryForm";
import { categoryQueries } from "@/app/_constants/queryFactories";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface Props {
  categoryId?: number;
  onClose: () => void;
}
const EditCategoryDialog = ({ categoryId, onClose }: Props) => {
  const { data: category, isPending } = useQuery({
    ...categoryQueries.byId(categoryId),
    enabled: !!categoryId,
  });

  const isEditMode = !!categoryId;
  const shouldShowSpinner = isEditMode && isPending;

  return (
    <Dialog
      open={true}
      fullWidth={true}
      maxWidth="sm"
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            padding: 4,
          },
        },
      }}
    >
      <DialogTitle sx={{ padding: 0 }}>
        {categoryId ? "Update" : "Add"} Category
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <DialogContentText></DialogContentText>
        {shouldShowSpinner ? (
          <Stack minHeight="40dvh" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : (
          <UpdateCategoryForm
            category={category}
            formMode={categoryId ? "edit" : "create"}
            onCancel={onClose}
            afterSubmit={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
