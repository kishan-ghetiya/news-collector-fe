"use client";

import { authService, userService } from "@/app/services";
import { deleteCookie, getCookie } from "@/components/utils";
import { ApiError } from "@/types/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      const userId = getCookie("userId");
      if (!userId) return;

      try {
        const response = await userService.getUserById(userId);
        setUser(response);
      } catch (error: unknown) {
        toast.error((error as ApiError)?.message || "Failed to load user");
        handleLogout();
      }
    };

    initializeUser();
  }, []);

  const handleLogout = async () => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
        router.push("/")
      } catch (err) {
        console.error("Logout error", err);
      }
    }
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
