"use client";

import { authService } from "@/app/services";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      try {
        const response = await authService.refreshTokens(refreshToken);
        console.log(response);
        localStorage.setItem("accessToken", response.tokens.access.token);
        localStorage.setItem("refreshToken", response.tokens.refresh.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
      } catch (error) {
        console.error("Token refresh failed", error);
        handleLogout();
      }
    };

    initializeUser();
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
      } catch (err) {
        console.error("Logout error", err);
      }
    }
    localStorage.clear();
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
