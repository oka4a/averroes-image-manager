"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import UpdateImageDialog from "./UpdateImageDialog";

const AddImageButton = () => {
  const [showAddImage, setShowAddImage] = useState(false);

  const onAdd = () => {
    setShowAddImage(true);
  };

  return (
    <>
      <Button variant="contained" onClick={onAdd}>
        Add Image
      </Button>
      {showAddImage && (
        <UpdateImageDialog onClose={() => setShowAddImage(false)} />
      )}
    </>
  );
};

export default AddImageButton;
