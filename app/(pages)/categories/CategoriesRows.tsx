"use client";

import { categoryQueries } from "@/app/_constants/queryFactories";
import { Box, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CategoryActions from "./CategoryActions";
import SkeltonRows from "@/app/_components/SkeletonRows";

const CategoriesRows = () => {
  const { data: categories, isPending } = useQuery(categoryQueries.all());

  if (isPending) {
    return <SkeltonRows noOfCols={5} />;
  }

  return categories?.map((category) => (
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
        <CategoryActions id={category.id} />
      </TableCell>
    </TableRow>
  ));
};

export default CategoriesRows;
