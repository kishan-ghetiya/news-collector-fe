"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { nonAuthRoutes } from "@/components/utills";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showLayout = !nonAuthRoutes.includes(pathname);

  return (
    <>
      {showLayout && <Header />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
