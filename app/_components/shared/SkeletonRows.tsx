import { Skeleton, TableCell, TableRow } from "@mui/material";

const SkeltonRows = ({
  noOfRows = 6,
  noOfCols,
}: {
  noOfRows?: number;
  noOfCols: number;
}) =>
  Array.from({ length: noOfRows }).map((_, i) => (
    <TableRow key={i}>
      <TableCell colSpan={noOfCols}>
        <Skeleton variant="text" sx={{ fontSize: "14px" }} />
      </TableCell>
    </TableRow>
  ));

export default SkeltonRows;
