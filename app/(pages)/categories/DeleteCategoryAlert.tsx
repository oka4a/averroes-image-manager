import useDeleteCategory from "@/app/_hooks/useDeleteCategory";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface DeleteCategoryAlertProps {
  category?: ICategory;
  onClose: () => void;
}
const DeleteCategoryAlert = ({
  category,
  onClose,
}: DeleteCategoryAlertProps) => {
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory({
    afterSuccess: onClose,
  });

  const open = !!category;

  const onDelete = () => {
    if (!category) return;
    deleteCategory(category.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete {category?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this category?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ margin: 2 }}>
        <Button onClick={onClose}>No</Button>
        <Button
          variant="contained"
          autoFocus
          onClick={onDelete}
          loading={isDeleting}
          sx={{
            background: "#ef4444",
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryAlert;
