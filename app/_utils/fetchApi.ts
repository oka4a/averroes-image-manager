import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  let data: unknown = null;

  // Ensure JSON parsing only if the response is JSON
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    data = await res.json();
  }

  // Handle errors
  if (!res.ok) {
    if (res.status === 404) notFound();

    let message = `Failed to fetch (status: ${res.status})`;

    if (typeof data === "object" && data !== null && "error" in data) {
      const error = data.error as Record<string, string | number>;
      if (typeof error === "object" && error !== null) {
        message = `${error.status} ${error.name}: ${error.message}`;
      }
    }

    throw new Error(message);
  }

  return data as T;
}
