"use client";

import { useRouter } from 'next/navigation';
import { useApiMutation } from './useApi';
import axiosInstance from '@/utils/axiosConfig';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthResponse {
  token: string;
  refresh_token: string;
}

export const useAuth = () => {
  const router = useRouter();

  // Login mutation
  const loginMutation = useApiMutation<AuthResponse, Error, LoginCredentials>(
    async (credentials) => {
      const response = await axiosInstance.post('/auth/login', credentials); 
      return response;
    },
    {
      onSuccess: (response) => {
        console.log('Login başarılı:', response);
        
        // Token'ı localStorage'a kaydet
        localStorage.setItem('token', response.token);
        
        // Axios instance header'ına token'ı ekle
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.refresh_token}`;

        // Ana sayfaya yönlendir
        setTimeout(() => {
          router.replace('/');
        }, 100);
      },
      onError: (error) => {
        console.log("burası hata");
        
        console.error('Login error:', error);
        throw error;
      },
    }
  );

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
  };
};
