import { useMutation, useQuery } from '@tanstack/react-query';
import * as userService from '../services/userService';
import { EditProfilePayload, UserResponse } from '../types/user';

export const useGetUser = (userId: string) =>
    useQuery<UserResponse, Error>({
        queryKey: ['user', userId],
        queryFn: async () => (await userService.getUser(userId)).data,
        enabled: !!userId,
    });

export const useEditUserProfile = (userId: string) =>
    useMutation<UserResponse, Error, EditProfilePayload>({
        mutationFn: async (data: EditProfilePayload) =>
            (await userService.editUserProfile(userId, data)).data,
    });

export const useDeleteUser = (userId: string) =>
    useMutation<void, Error, void>({
        mutationFn: async () => {
            await userService.deleteUser(userId);
        },
    });
