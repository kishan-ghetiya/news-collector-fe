export interface EditProfilePayload {
  fullName?: string;
  newPassword?: string;
}

export interface UserResponse {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean; // For email verification status
  verificationCode: string | null; // Optional field for verification code
  verificationCodeExpiry: string | null; // Optional field for verification code expiry
  otpAttempts: number; // Number of OTP attempts
  lastOtpAttemptDate: string; // ISO date of the last OTP attempt
  refreshDataAttempts: number; // Number of refresh data attempts
  lastRefreshDataAttemptDate: string | null; // Last refresh data attempt date
  createdAt: string; // Account creation date
  updatedAt: string; // Last update date
}
