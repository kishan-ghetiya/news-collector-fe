import api from "../lib/axios";
import { ChangePasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, TokenResponse } from "../types/auth";

export const register = (payload: RegisterPayload) => api.post("/register", payload);
export const login = (payload: LoginPayload) => api.post("/login", payload);
export const sendVerificationEmail = (email: string) => api.post("/send-verification-email", { email });
export const verifyEmail = (userId: string, code: string) =>
    api.post(`/verify-email?userId=${userId}&verificationCode=${code}`);
export const forgotPassword = (email: string) => api.post("/forgot-password", { email });
export const resetPassword = (token: string, payload: ResetPasswordPayload) =>
    api.post(`/reset-password?token=${token}`, payload);
export const changePassword = (payload: ChangePasswordPayload, token: string) =>
    api.post("/change-password", payload, { headers: { Authorization: `Bearer ${token}` } });
export const refreshTokens = (refreshToken: string) =>
    api.post<TokenResponse>("/refresh-tokens", { refreshToken }, { headers: { Authorization: `Bearer ${refreshToken}` } });
export const logout = (refreshToken: string, token: string) =>
    api.post("/logout", { refreshToken }, { headers: { Authorization: `Bearer ${token}` } });
