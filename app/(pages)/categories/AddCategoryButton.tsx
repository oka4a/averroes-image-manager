"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import UpdateCategoryDialog from "./UpdateCategoryDialog";

const AddCategoryButton = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const onAdd = () => {
    setShowAddCategory(true);
  };

  return (
    <>
      <Button variant="contained" onClick={onAdd}>
        Add Category
      </Button>
      {showAddCategory && (
        <UpdateCategoryDialog onClose={() => setShowAddCategory(false)} />
      )}
    </>
  );
};

export default AddCategoryButton;
