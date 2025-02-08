import SkeltonRows from "@/app/_components/SkeletonRows";
import getCategories from "@/app/_services/commentsApi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Suspense } from "react";
import CategoryActions from "./CategoryActions";
import Image from "next/image";

const categoriesColumns = ["Name", "Description", "Image", ""];

const CategoriesTable = async () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {categoriesColumns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense
            fallback={<SkeltonRows noOfCols={categoriesColumns.length} />}
          >
            <CategoriesRows />
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CategoriesRows = async () => {
  const categories = await getCategories();

  return categories.map((category) => (
    <TableRow
      key={category.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {category.name}
      </TableCell>
      <TableCell>{category.description}</TableCell>
      <TableCell>
        <Image
          src={category.image}
          alt={category.name}
          width={50}
          height={50}
        />
      </TableCell>
      <TableCell align="right">
        <CategoryActions id={category.id} />
      </TableCell>
    </TableRow>
  ));
};

export default CategoriesTable;
