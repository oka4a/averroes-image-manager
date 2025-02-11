"use client";

import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeGrid as Grid } from "react-window";
import ImageItem from "./ImageItem";

import ImagePreviewDialog from "@/app/_components/shared/ImagePreviewDialog";
import { imageQueries } from "@/app/_constants/queryFactories";
import useCategoriesOptions from "@/app/_hooks/useCategoriesOptions";
import { debounce } from "@/app/_utils/debounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DeleteImageAlert from "./DeleteImageAlert";
import ImageSkeleton from "./ImageSkeleton";
import ImagesWrapper from "./ImagesWrapper";
import UpdateImageDialog from "./UpdateImageDialog";

const gutterSize = 12; // Space between images

const imageDetailsHeight = 165;

const ImagesGrid = () => {
  const { data: images = [], isPending } = useQuery(imageQueries.all());
  const [imageToView, setImageToView] = useState<IImage | undefined>(undefined);

  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [imageToDelete, setImageToDelete] = useState<IImage | undefined>(
    undefined,
  );
  const { categoriesOptions = [] } = useCategoriesOptions();

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(-1);

  const debouncedSetSearch = debounce((val: string) => setSearch(val), 400);

  const filiteredImages = images.filter(
    (image) =>
      image.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryId === -1 || image.categoryId === categoryId),
  );

  const showEditImageDialog = !!editingImageId;

  const onEdit = (id: number) => {
    setEditingImageId(id);
  };

  const onDeleteImage = (image: IImage) => {
    setImageToDelete(image);
  };

  const onDeleteImageCancel = () => {
    setImageToDelete(undefined);
  };

  const openImagePreview = !!imageToView;

  const onImageView = (image: IImage) => {
    setImageToView(image);
  };
  const closeImagePreview = () => {
    setImageToView(undefined);
  };

  const getRowHeight = (
    rowIndex: number,
    columnWidth: number,
    numColumns: number,
  ) => {
    const startIndex = rowIndex * numColumns;
    const endIndex = Math.min(startIndex + numColumns, filiteredImages.length);

    let maxHeight = 200; // Default height

    for (let i = startIndex; i < endIndex; i++) {
      const image = filiteredImages[i];
      if (!image) continue;
      const [width, height] = image.metadata.resolution.split("x").map(Number);
      const aspectRatio = width / height;
      const computedHeight = columnWidth / aspectRatio;
      maxHeight = Math.max(maxHeight, computedHeight);
    }
    return maxHeight + imageDetailsHeight;
  };

  if (isPending) {
    return (
      <ImagesWrapper>
        {Array.from({ length: 12 }).map((_, ind) => (
          <ImageSkeleton key={ind} />
        ))}
      </ImagesWrapper>
    );
  }

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search..."
        slotProps={{
          input: {
            sx: {
              borderRadius: 2,
              backgroundColor: "white",
            },
          },
        }}
        sx={{
          mb: 2,
          marginInlineEnd: 2,
          width: "100%",
          maxWidth: 350,
          height: 70,
        }}
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />

      {/* add loading  */}
      <Select
        value={categoryId?.toString()}
        onChange={(e: SelectChangeEvent) =>
          setCategoryId(Number(e.target.value))
        }
        variant="outlined"
        sx={{
          minWidth: 150,
        }}
      >
        <MenuItem value="-1">All Categories</MenuItem>
        {categoriesOptions?.map((category) => {
          return (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          );
        })}
      </Select>

      {/* TODO: use window scroll */}
      <Box sx={{ width: "100%", height: "90vh" }}>
        <AutoSizer>
          {({ height: containerHeight, width: containerWidth }) => {
            let numColumns = 1;

            if (containerWidth > 1200) {
              numColumns = 3;
            } else if (containerWidth > 800) {
              numColumns = 2;
            }

            const numRows = Math.ceil(filiteredImages.length / numColumns);
            const colWidth =
              (containerWidth - gutterSize * (numColumns - 1)) / numColumns;

            return (
              <Grid
                columnCount={numColumns}
                rowCount={numRows}
                rowHeight={(ind) => getRowHeight(ind, colWidth, numColumns)}
                columnWidth={() => colWidth}
                width={containerWidth}
                height={containerHeight}
                className="window-grid"
              >
                {({ columnIndex, rowIndex, style }) => {
                  const imageIndex = rowIndex * numColumns + columnIndex;
                  if (imageIndex >= filiteredImages.length) return null;
                  const image = filiteredImages[imageIndex];

                  return (
                    <Box paddingX={`${gutterSize}px`} style={style}>
                      <ImageItem
                        image={image}
                        colWidth={colWidth}
                        onEdit={() => onEdit(image.id)}
                        onDelete={() => onDeleteImage(image)}
                        onImageView={() => onImageView(image)}
                      />
                    </Box>
                  );
                }}
              </Grid>
            );
          }}
        </AutoSizer>

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
        <DeleteImageAlert onClose={onDeleteImageCancel} image={imageToDelete} />
        {showEditImageDialog && (
          <UpdateImageDialog
            onClose={() => setEditingImageId(null)}
            imageId={editingImageId}
          />
        )}
      </Box>
    </>
  );
};

export default ImagesGrid;
