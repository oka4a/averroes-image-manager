import { getPageTitle } from "@/app/_constants/docTitle";
import { Box, Stack, Typography } from "@mui/material";
import AddCategoryButton from "./AddCategoryButton";
import CategoriesTable from "./CategoriesTable";

export const metadata = {
  title: getPageTitle("Categories"),
};
const CategoirsPage = async () => {
  return (
    <Box>
      <Stack
        sx={{ mb: 4 }}
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography component="h1" sx={{ fontSize: "2rem" }}>
          Categories
        </Typography>
        <AddCategoryButton />
      </Stack>
      <CategoriesTable />
    </Box>
  );
};

export default CategoirsPage;
