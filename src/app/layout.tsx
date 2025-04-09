"use client";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { nonAuthRoutes } from "@/components/utills";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {!nonAuthRoutes.includes(pathname) && <Header />}
        {children}
      </body>
    </html>
  );
}
