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
  verified?: boolean;
}
