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
