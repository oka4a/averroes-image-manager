"use client";

import { categoryQueries } from "@/app/_constants/queryFactories";
import { Box, Button, Stack, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import SkeltonRows from "@/app/_components/shared/SkeletonRows";
import { useState } from "react";
import EditCategoryDialog from "./UpdateCategoryDialog";
import DeleteCategoryAlert from "./DeleteCategoryAlert";

const CategoriesRows = () => {
  const { data: categories, isPending } = useQuery(categoryQueries.all());
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [categoryToDelete, setCategoryToDelete] = useState<
    ICategory | undefined
  >(undefined);

  const onEdit = (id: number) => {
    setEditingCategoryId(id);
  };

  const onDeleteCategory = (category: ICategory) => {
    setCategoryToDelete(category);
  };

  const onDeleteCategoryCancel = () => {
    setCategoryToDelete(undefined);
  };

  if (isPending) {
    // client fetching
    return <SkeltonRows noOfCols={5} />;
  }

  return (
    <>
      {categories?.map((category) => (
        <TableRow
          key={category.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {category.name}
          </TableCell>
          <TableCell>
            <Box component="div" className="truncate" maxWidth="250px">
              {category.description}
            </Box>
          </TableCell>
          <TableCell>
            <Image
              src={category.image}
              alt={category.name}
              width={50}
              height={50}
              style={{ borderRadius: "5px" }}
            />
          </TableCell>
          <TableCell>
            <Stack direction="row" justifyContent="flex-end" gap={2}>
              <Button variant="contained" onClick={() => onEdit(category.id)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDeleteCategory(category)}
              >
                Delete
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      ))}

      {editingCategoryId && (
        <EditCategoryDialog
          categoryId={editingCategoryId}
          onClose={() => setEditingCategoryId(null)}
        />
      )}

      <DeleteCategoryAlert
        category={categoryToDelete}
        onClose={onDeleteCategoryCancel}
      />
    </>
  );
};

export default CategoriesRows;
