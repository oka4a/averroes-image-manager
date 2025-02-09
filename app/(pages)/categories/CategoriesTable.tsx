import CategoriesPrefetcher from "@/app/_components/CategoriesPrefetcher";
import SkeltonRows from "@/app/_components/SkeletonRows";
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
import CategoriesRows from "./CategoriesRows";

const categoriesColumns = ["Name", "Description", "Image", ""];

const CategoriesTable = () => {
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
            <CategoriesPrefetcher>
              <CategoriesRows />
            </CategoriesPrefetcher>
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
