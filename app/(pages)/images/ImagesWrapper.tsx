import { ImageList, ImageListProps } from "@mui/material";
import React from "react";

const ImagesWrapper = (props: ImageListProps) => {
  return (
    <ImageList
      variant="masonry"
      sx={{
        columnCount: {
          // Using !important as ImageList lacks responsive flexibility
          xs: "1 !important",
          sm: "2 !important",
          md: "4 !important",
        },
        p: 1,
      }}
      gap={20}
      {...props}
    />
  );
};

export default ImagesWrapper;
