import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider as MuiAppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./_theme";
import Header from "./_components/Header";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Image Manager",
  description: "Mange your images",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <MuiAppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={roboto.variable}>
            <Header />
            <Container maxWidth="xl" sx={{ py: 8 }}>
              {children}
            </Container>
          </body>
        </ThemeProvider>
      </MuiAppRouterCacheProvider>
    </html>
  );
}
