import { Box, Skeleton } from "@mui/material";

const ImageSkeleton = () => {
  return (
    <Box pb={4}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"200px"}
        sx={{ borderRadius: "8px" }}
      />
      <Skeleton width="40%" sx={{ mt: 1 }} />
      <Skeleton width="20%" />
    </Box>
  );
};

export default ImageSkeleton;
