import { Box, Stack, Typography } from "@mui/material";
import ImagesGrid from "./ImagesGrid";
import ImagesPrefetcher from "@/app/_components/shared/ImagesPrefetcher";
import { Suspense } from "react";
import ImagesWrapper from "./ImagesWrapper";
import ImageSkeleton from "./ImageSkeleton";

const ImagesPage = async () => {
  return (
    <Box>
      <Stack
        sx={{ mb: 4 }}
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography component="h1" sx={{ fontSize: "2rem" }}>
          Images
        </Typography>
      </Stack>
      <Suspense
        fallback={
          <ImagesWrapper>
            {Array.from({ length: 12 }).map((_, ind) => (
              <ImageSkeleton key={ind} />
            ))}
          </ImagesWrapper>
        }
      >
        <ImagesPrefetcher>
          <ImagesGrid />
        </ImagesPrefetcher>
      </Suspense>
    </Box>
  );
};

export default ImagesPage;
