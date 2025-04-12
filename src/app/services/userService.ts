import { EditProfilePayload, User } from "@/types/user";
import apiClient from "../lib/apiClient";

export const userService = {
  editProfile: (userId: string, data: EditProfilePayload) =>
    apiClient<User>(`users/edit-profile/${userId}`, {
      method: "PATCH",
      body: data,
    }),

  deleteUser: (userId: string) =>
    apiClient<void>(`users/delete/${userId}`, {
      method: "DELETE",
    }),

  getUserById: (userId: string) =>
    apiClient<User>(`users/get/${userId}`, {
      method: "GET",
    }),
};
