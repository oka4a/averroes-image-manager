import useDeleteImage from "@/app/_hooks/useDeleteImage";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteImageAlertProps {
  image?: IImage;
  onClose: () => void;
}
const DeleteImageAlert = ({ image, onClose }: DeleteImageAlertProps) => {
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteImage({
    afterSuccess: onClose,
  });

  const open = !!image;

  const onDelete = () => {
    if (!image) return;
    deleteImage(image.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete {image?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this image?
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

export default DeleteImageAlert;
