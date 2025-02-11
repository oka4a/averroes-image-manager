import { Delete, Edit } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

interface ImageActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}
const ImageActions = ({ onDelete, onEdit }: ImageActionsProps) => {
  return (
    <Stack direction="row" spacing={1} mt={3}>
      <Button
        startIcon={<Edit />}
        onClick={onEdit}
        variant="outlined"
        size="small"
        disableRipple
        sx={{
          textTransform: "none",
          fontSize: "0.8rem",
          transition: "transform 0.2s",
          flex: 1,
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        Edit
      </Button>
      <Button
        startIcon={<Delete />}
        onClick={onDelete}
        disableRipple
        variant="outlined"
        color="error"
        size="small"
        sx={{
          textTransform: "none",
          fontSize: "0.8rem",
          transition: "transform 0.2s",
          flex: 1,
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default ImageActions;
