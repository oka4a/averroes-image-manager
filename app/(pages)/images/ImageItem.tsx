"use client";

import { categoryQueries } from "@/app/_constants/queryFactories";
import { Box, Chip, ImageListItemBar, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ImageActions from "./ImageActions";

interface ImageItemProps {
  image: IImage;
  onImageView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  colWidth: number;
}
const ImageItem = ({
  image,
  onImageView,
  onEdit,
  onDelete,
  colWidth,
}: ImageItemProps) => {
  const { data: categories, isPending: isPendingCategories } = useQuery(
    categoryQueries.all(),
  );

  const [width, height] = image.metadata.resolution.split("x");
  const uploadDate = image.uploadDate.split("T")[0];

  const category = categories?.find((item) => item.id === image.categoryId);
  const categoryName = isPendingCategories ? "..." : category?.name;

  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      sx={{
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        // boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        background: "rgba(255, 255, 255, 0.6)",

        "& img:hover": {
          transform: "scale(1.01)",
          boxShadow: 4,
          cursor: "pointer",
        },
      }}
    >
      <Image
        loading="lazy"
        onClick={onImageView}
        src={image.url}
        alt={image.name}
        width={colWidth}
        height={colWidth / (+width / +height)}
        style={{
          width: `100%`,
          height: `auto`,
          aspectRatio: `${width}/${height}`,
          borderRadius: "8px 8px 0 0",
        }}
        // width={+width}
        // height={+height}
        // sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        // style={{
        //   width: "100%",
        //   height: "auto",
        //   aspectRatio: `${width}/${height}`,
        //   borderRadius: "8px 8px 0 0",
        // }}
      />
      <Stack
        paddingX={2}
        paddingBlockEnd="12px"
        paddingBlockStart="4px"
        flex={1}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBlockEnd="6px"
        >
          <ImageListItemBar
            position="below"
            title={image.name}
            sx={{
              "& .MuiImageListItemBar-titleWrap": {
                padding: 0,
              },
              "& .MuiImageListItemBar-title": {
                color: "#333",
                fontSize: "1rem",
                fontWeight: 600,
              },
            }}
          />
          <Chip
            label={categoryName}
            color="secondary"
            variant="outlined"
            size="small"
            sx={{ borderRadius: "5px", minWidth: "50px" }}
          />
        </Stack>
        <Box fontSize="0.8rem" marginBlockEnd="6px" color="#444">
          Uploaded: {uploadDate}
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Box fontSize="0.8rem" color="#666">
            Resolution: {image.metadata.resolution}
          </Box>
          <Box fontSize="0.8rem" color="#666">
            Size: {image.metadata.size}
          </Box>
        </Stack>
        <ImageActions onEdit={onEdit} onDelete={onDelete} />
      </Stack>
    </Stack>
  );
};

export default ImageItem;
