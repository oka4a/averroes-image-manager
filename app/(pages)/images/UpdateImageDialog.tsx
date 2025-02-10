"use client";

import UpdateImageForm from "@/app/_components/forms/UpdateImageForm";
import { imageQueries } from "@/app/_constants/queryFactories";
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
  imageId?: number;
  onClose: () => void;
}
const UpdateImageDialog = ({ imageId, onClose }: Props) => {
  const { data: image, isPending } = useQuery({
    ...imageQueries.byId(imageId),
    enabled: !!imageId,
  });

  const isEditMode = !!imageId;
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
        {imageId ? "Update" : "Add"} Image
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <DialogContentText></DialogContentText>
        {shouldShowSpinner ? (
          <Stack minHeight="40dvh" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : (
          <UpdateImageForm
            image={image}
            formMode={imageId ? "edit" : "create"}
            onCancel={onClose}
            afterSubmit={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateImageDialog;
