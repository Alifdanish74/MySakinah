// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdminThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "MySakinah Admin: Dashboard",
  description: "Admin dashboard for MySakinah Pro. Manage form submissions across all modules.",
  robots: "noindex, nofollow", // admin panel should not be indexed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased">
        <AdminThemeProvider>{children}</AdminThemeProvider>
      </body>
    </html>
  );
}
