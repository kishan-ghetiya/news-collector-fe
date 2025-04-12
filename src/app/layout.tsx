import { Manrope } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Optional: define the weights you need
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "New Collector App",
  description:
    "News Collector App aggregates and displays the latest news from various sources. Users can explore articles by categories and tags for a tailored reading experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
