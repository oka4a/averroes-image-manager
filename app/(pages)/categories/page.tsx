import { Box, Button, Stack, Typography } from "@mui/material";
import CategoriesTable from "./CategoriesTable";

const CategoirsPage = async () => {
  return (
    <Box>
      <Stack
        sx={{ mb: 4 }}
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography component="h1">Categories</Typography>
        <Button variant="contained">Add Comment</Button>
      </Stack>
      <CategoriesTable />
    </Box>
  );
};

export default CategoirsPage;
