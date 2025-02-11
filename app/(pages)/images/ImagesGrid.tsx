"use client";

import ImagePreviewDialog from "@/app/_components/shared/ImagePreviewDialog";
import { imageQueries } from "@/app/_constants/queryFactories";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ImageItem from "./ImageItem";
import ImageSkeleton from "./ImageSkeleton";
import ImagesWrapper from "./ImagesWrapper";
import DeleteImageAlert from "./DeleteImageAlert";
import UpdateImageDialog from "./UpdateImageDialog";

const ImagesGrid = () => {
  const { data: images = [], isPending } = useQuery(imageQueries.all());
  const [imageToView, setImageToView] = useState<IImage | undefined>(undefined);

  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [imageToDelete, setImageToDelete] = useState<IImage | undefined>(
    undefined,
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

  return (
    <>
      <ImagesWrapper>
        {images.map((image) => {
          return isPending ? (
            <ImageSkeleton key={image.id} />
          ) : (
            <ImageItem
              image={image}
              key={image.id}
              onImageView={() => onImageView(image)}
              onEdit={() => onEdit(image.id)}
              onDelete={() => onDeleteImage(image)}
            />
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
      <DeleteImageAlert onClose={onDeleteImageCancel} image={imageToDelete} />
      {showEditImageDialog && (
        <UpdateImageDialog
          onClose={() => setEditingImageId(null)}
          imageId={editingImageId}
        />
      )}
    </>
  );
};

export default ImagesGrid;
