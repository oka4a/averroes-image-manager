"use client";

import { categoryQueries } from "@/app/_constants/queryFactories";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import SkeltonRows from "@/app/_components/shared/SkeletonRows";
import { useState } from "react";
import EditCategoryDialog from "./UpdateCategoryDialog";

const CategoriesRows = () => {
  const { data: categories, isPending } = useQuery(categoryQueries.all());
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );

  const onEdit = (id: number) => {
    setEditingCategoryId(id);
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
          <TableCell align="right">
            <Button variant="contained" onClick={() => onEdit(category.id)}>
              Edit
            </Button>
          </TableCell>
        </TableRow>
      ))}

      {editingCategoryId && (
        <EditCategoryDialog
          categoryId={editingCategoryId}
          onClose={() => setEditingCategoryId(null)}
        />
      )}
    </>
  );
};

export default CategoriesRows;
