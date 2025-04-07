import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RegisterPayload } from '../types/auth';
import { register } from '../services';

type RegisterResponse = {
    message: string;
};

export const useRegister = () => {
    return useMutation<RegisterResponse, AxiosError, RegisterPayload>({
        mutationFn: (data) => register(data).then((res) => res.data),
    });
};
