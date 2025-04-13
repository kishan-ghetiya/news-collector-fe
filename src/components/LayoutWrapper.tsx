"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { nonAuthRoutes } from "@/components/utils";
import { AuthProvider } from "@/context/auth-context";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import RedirectRoute from "./RedirectRoute";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showLayout = !nonAuthRoutes.includes(pathname);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <AuthProvider>
        <Toaster position="top-right" />
        <RedirectRoute>
          {showLayout && <Header />}
          {children}
          {showLayout && <Footer />}
        </RedirectRoute>
      </AuthProvider>
    </>
  );
}
