export const ROUTES = {
  HOME: {
    label: "Home",
    href: "/",
  },
  CATEGORIES: {
    label: "Categories",
    href: "/categories",
  },
  // add getPath for dynamic routes
} as const;

export type RouteKey = keyof typeof ROUTES;
