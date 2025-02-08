"use client";

import { Button } from "@mui/material";

interface CategoryActionsProps {
  id: number;
}
const CategoryActions = ({ id }: CategoryActionsProps) => {
  console.log(id);
  return <Button variant="contained">Edit</Button>;
};

export default CategoryActions;
