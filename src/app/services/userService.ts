import axios from 'axios';
import { EditProfilePayload, UserResponse } from '../types/user';

export const editUserProfile = (userId: string, data: EditProfilePayload) =>
    axios.patch<UserResponse>(`/v1/users/edit-profile/${userId}`, data);

export const deleteUser = (userId: string) =>
    axios.delete(`/v1/users/delete/${userId}`);

export const getUser = (userId: string) =>
    axios.get<UserResponse>(`/v1/users/get/${userId}`);
