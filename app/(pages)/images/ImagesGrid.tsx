"use client";

import ImagePreviewDialog from "@/app/_components/shared/ImagePreviewDialog";
import { categoryQueries, imageQueries } from "@/app/_constants/queryFactories";
import {
  Box,
  Chip,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import ImageSkeleton from "./ImageSkeleton";
import ImagesWrapper from "./ImagesWrapper";

const ImagesGrid = () => {
  const { data: images = [], isPending } = useQuery(imageQueries.all());
  const [imageToView, setImageToView] = useState<IImage | undefined>(undefined);

  const openImagePreview = !!imageToView;

  const onImageView = (image: IImage) => {
    setImageToView(image);
  };
  const closeImagePreview = () => {
    setImageToView(undefined);
  };

  return (
    <>
      <ImagesWrapper>
        {images.map((image) => {
          return isPending ? (
            <ImageSkeleton key={image.id} />
          ) : (
            <ImageItem image={image} key={image.id} onImageView={onImageView} />
          );
        })}
      </ImagesWrapper>
      {imageToView && (
        <ImagePreviewDialog
          open={openImagePreview}
          onClose={closeImagePreview}
          dialogTitle={imageToView.name}
          imgSrc={imageToView.url}
          imgAlt={imageToView.name}
          imgResolution={imageToView.metadata.resolution}
        />
      )}
    </>
  );
};

interface ImageItemProps {
  image: IImage;
  onImageView: (image: IImage) => void;
}
const ImageItem = ({ image, onImageView }: ImageItemProps) => {
  const { data: categories, isPending: isPendingCategories } = useQuery(
    categoryQueries.all(),
  );

  const [width, height] = image.metadata.resolution.split("x");
  const uploadDate = image.uploadDate.split("T")[0];

  const category = categories?.find((item) => item.id === image.categoryId);
  const categoryName = isPendingCategories ? "..." : category?.name;

  return (
    <ImageListItem
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        background: "rgba(255, 255, 255, 0.6)",

        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 4,
          cursor: "pointer",
        },
      }}
      onClick={() => onImageView(image)}
    >
      <Image
        loading="lazy"
        src={image.url}
        alt={image.name}
        width={+width}
        height={+height}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${width}/${height}`,
          borderRadius: "8px 8px 0 0",
        }}
      />
      <Box padding={2} paddingBlockStart="4px">
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
            color="info"
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
      </Box>
    </ImageListItem>
  );
};

export default ImagesGrid;
