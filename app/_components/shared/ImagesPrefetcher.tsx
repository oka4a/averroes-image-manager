import { imageQueries } from "@constants/queryFactories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const ImagesPrefetcher = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(imageQueries.all());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ImagesPrefetcher;
