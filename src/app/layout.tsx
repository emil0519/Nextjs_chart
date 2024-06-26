import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";
import { GlobalStyles, CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emil - Next.js Chart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />{" "}
          <GlobalStyles
            styles={{
              body: { background: "#EDEDED", padding:0 },
              '*::-webkit-scrollbar': {
                width: "8px",
              },
              '*::-webkit-scrollbar-track': {
                backgroundColor: 'white', 
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'darkgrey', 
                borderRadius: '4px',
              },
            }}
          />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
