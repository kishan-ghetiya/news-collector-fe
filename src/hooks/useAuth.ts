import { authService } from '@/app/services';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user data or decode from JWT
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        localStorage.setItem('token', response.token);
        setUser(response.user);
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            await authService.logout(refreshToken);
        }
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, login, logout };
};