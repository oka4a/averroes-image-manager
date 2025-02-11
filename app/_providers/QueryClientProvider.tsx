"use client";

import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

interface CustomError {
  message: string;
  status?: number;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: CustomError;
  }
}
function makeQueryClient() {
  const onError = (e: CustomError) => {
    // TODO: handle global errors here
    console.error(e);
  };

  const queryCache = new QueryCache({
    onError,
  });

  const mutationCache = new MutationCache({
    onError,
  });
  return new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Client: re-use the same query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
