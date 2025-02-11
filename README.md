# Averroes Image Manager

## Overview

Averroes Image Manager is a web application designed to manage images, categories, and annotations. It provides functionalities such as:

- **Uploading images**
- **Viewing images**
- **Deleting images**
- **Annotating images using drawing tools**

This project is experimental, and while we typically believe highly dynamic dashboards do not require Next.js (as React alone suffices without SEO concerns), we are using Next.js here purely for exploration.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (V22.13.0 recommended)
- **pnpm**
- **prepare husky**: `pnpm prepare`
- **add .env file**: `NEXT_PUBLIC_API_URL=https://my-json-server.typicode.com/MostafaKMilly/demo`
  `

### Scripts

- **Install dependencies**: `pnpm install`
- **Run development server**: `pnpm dev`
- **Build for production**: `pnpm build`

### Features

#### UI

We are not focusing on UI in this project, so the design is kept minimal and functional.

#### Data Fetching

- We use server components to prefetch data into TanStack Query, allowing the client to start with prefetched data and continue fetching on the client side.
- We set a staleTime greater than 0 to prevent refetching immediately on first render.
- Suspense is used to show a skeleton loader while fetching data on the server.
- isPending is used to display a skeleton loader for client-side refetching.

#### Form Validation

- We use client-side validation for an instant response, avoiding server-side latency.
- react-hook-form is used to manage form states efficiently.
- zod is used for schema validation.
- We integrated MUI with react-hook-form, ensuring compatibility despite MUI fields being controlled by default.

#### Backend

- We use a JSON server to simulate backend responses and filters.

### Folder Structure

**Folders prefixed with `_` (underscore)**: These are **conventional internal modules** that are not directly tied to routing. They contain reusable logic, UI components, and utilities that support the app.
**Folders wrapped in `()` (parentheses)**: These follow **Next.js conventions**, representing **route segments** in the application.

app: Contains the main application code, including pages, components, and utilities.

- \_components: Reusable UI components used throughout the application.
- \_constants: Global constants and configuration values used throughout the application.
- \_hooks: Custom React hooks used to manage state and side effects.
- \_schemas: Validation schemas for forms and data using Zod.
- \_services: API clients and utility functions for interacting with the backend.
- \_styles: Global CSS styles.
- \_utils: Utility functions used throughout the application.

(pages): Individual pages of the application, including the image management pages, and category management pages.
