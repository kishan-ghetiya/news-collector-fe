import { User } from "./user";

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  tokens: {
    access: {
      token: string; 
      expires: string; 
    };
    refresh: {
      token: string; 
      expires: string; 
    };
  };
  user: User; 
  data?: string; 
}



export interface ApiError {
  message: string;
  cause?: {
    isRegistered?: boolean;
  };
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as ApiError).message);
  }
  return "An unexpected error occurred";
}


