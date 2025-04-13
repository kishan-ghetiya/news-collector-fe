import { CookieOptions } from "@/types";
import Cookies from "js-cookie";

export const nonAuthRoutes = ["/register", "/login", "/verify-email"];

export const COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost",
  httpOnly: true,
};

export const handleSetCookie = ({ name, value, days = 7 }: CookieOptions) => {
  Cookies.set(name, value, {
    expires: days,
    path: "/", // makes it available throughout your site
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
};

// 🔍 Get a cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// ❌ Delete a cookie
export const deleteCookie = (name: string) => {
  Cookies.remove(name, { path: "/" });
};
