"use client";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { Manrope } from "next/font/google";
import "./globals.css";
import { nonAuthRoutes } from "@/components/utills";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Optional: define the weights you need
  variable: "--font-manrope",
  display: "swap",
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
      <body className={manrope.className}>
        {!nonAuthRoutes.includes(pathname) && <Header />}
        {children}
        {!nonAuthRoutes.includes(pathname) && <Footer />}{" "}
        {/* ✅ Show Footer only on authenticated pages */}
      </body>
    </html>
  );
}
