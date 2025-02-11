import ImagesPrefetcher from "@/app/_components/shared/ImagesPrefetcher";
import { Box, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import AddImageButton from "./AddImageButton";
import ImageGrid from "./ImagesGrid";
import ImageSkeleton from "./ImageSkeleton";
import ImagesWrapper from "./ImagesWrapper";

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
        <AddImageButton />
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
          <ImageGrid />
        </ImagesPrefetcher>
      </Suspense>
    </Box>
  );
};

export default ImagesPage;
