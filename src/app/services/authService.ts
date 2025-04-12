import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";
import apiClient from "../lib/apiClient";

export const authService = {
  register: (data: RegisterPayload) =>
    apiClient<AuthResponse>("auth/register", {
      method: "POST",
      body: data,
    }),

  login: async (data: LoginPayload) => {
    const response = await apiClient<AuthResponse>("auth/login", {
      method: "POST",
      body: data,
    });
    return response;
  },

  sendVerificationEmail: (email: string) =>
    apiClient<void>("auth/send-verification-email", {
      method: "POST",
      body: { email },
    }),

  verifyEmail: (email: string, verificationCode: string) =>
    apiClient<void>("auth/verify-email", {
      method: "POST",
      params: { email, verificationCode },
    }),

  forgotPassword: (email: string) =>
    apiClient<void>("auth/forgot-password", {
      method: "POST",
      body: { email },
    }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient<void>("auth/reset-password", {
      method: "POST",
      params: { token },
      body: { password: newPassword },
    }),

  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient<void>("auth/change-password", {
      method: "POST",
      body: { oldPassword, newPassword },
    }),

  refreshTokens: (refreshToken: string) =>
    apiClient<AuthResponse>("auth/refresh-tokens", {
      method: "POST",
      body: { refreshToken },
    }),

  logout: (refreshToken: string) =>
    apiClient<void>("auth/logout", {
      method: "POST",
      body: { refreshToken },
    }),
};
