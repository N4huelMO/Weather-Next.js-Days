import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./themeProvider";
import Sidebar from "@/components/Sidebar";
import { AppProvider } from "@/context/AppProvider";

const archivoNarrow = Rubik({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Weather Next.js Days",
  description: "App to see the weather around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-blue-100/50 dark:text-white text-slate-900 dark:bg-slate-900 flex flex-col md:flex-row ${archivoNarrow.className} duration-200`}
      >
        <AppProvider>
          <ThemeProvider
            enableSystem={true}
            attribute="class"
            defaultTheme="system"
          >
            <Sidebar />

            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
