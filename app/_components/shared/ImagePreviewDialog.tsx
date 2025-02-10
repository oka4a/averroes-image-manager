import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  imgAlt: string;
  imgResolution: string;
  dialogTitle: ReactNode;
}

const ImagePreviewDialog = ({
  open,
  imgSrc,
  imgAlt,
  dialogTitle,
  imgResolution,
  onClose,
}: Props) => {
  const [load, setLoad] = useState(true);
  const [width, height] = imgResolution.split("x");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>
        <Typography>{dialogTitle}</Typography>
        <Divider orientation="horizontal" />
        <Typography variant="caption" color="warning">
          Hint: Preview may not match the final uploaded image as the URL
          generates a random image each time.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack justifyContent="center" alignItems="center" padding="4">
          {/* TODO: fix skeleton size */}
          {load && (
            <Skeleton
              variant="rectangular"
              sx={{
                maxWidth: "100%",
                maxHeight: "60vh",
                height: `${height}px`,
                aspectRatio: `${width}/${height}`,
                borderRadius: "8px",
              }}
            />
          )}

          <Image
            src={imgSrc}
            alt={imgAlt}
            objectFit="contain"
            onLoad={() => setLoad(false)}
            onError={() => setLoad(false)}
            onErrorCapture={() => setLoad(false)}
            loading="eager"
            width={+width}
            height={+height}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              width: "auto",
              height: "auto",
              aspectRatio: `${width}/${height}`,
              borderRadius: "8px",
            }}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default ImagePreviewDialog;
