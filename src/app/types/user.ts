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
