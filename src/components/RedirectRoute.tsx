"use client";

import { useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectRouteProps {
  children: React.ReactNode;
}

const EXCLUDED_PATHS = [
  "/login",
  "/forgot-password",
  "/check-email",
  "/reset-password",
  "/account-suspended",
  "/account-reinstated",
  "/expire-link",
  "/success-email",
  "/register",
  "/verify-account",
  "/",
];

const RedirectRoute: React.FC<RedirectRouteProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && EXCLUDED_PATHS.includes(pathname)) {
      router.push("/");
    }
  }, [pathname, router, user]);

  return <>{children}</>;
};

export default RedirectRoute;
