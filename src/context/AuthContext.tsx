'use client';
import { AuthContextTypes, LoginForm } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { api } from '@/utils/fetcher';
import dayjs from 'dayjs';
import { QueryClient } from '@tanstack/react-query';

export const AuthContext = createContext<AuthContextTypes>({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logOut: () => {},
  isLoading: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  async function login(arg: LoginForm) {
    setLoading(true);
    try {
      const res = await api.post('/user/signin', { ...arg });
      if (res.data?.data?.token) {
        Cookies.set('token', res.data?.data.token as string, {
          secure: true,
          sameSite: 'lax',
          expires: dayjs(res.data?.data.expires_in).toDate(),
        });
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/dashboard/profile');
        toast.success('Login succesfully');
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'An error occurred';
      } else {
        throw 'An unexpected error occurred';
      }
    }
    setLoading(false);
  }

  const logOut = () => {
    Cookies.remove('token');
    toast.warn('Logged out!');
    router.push('/auth/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Cookies.get('token') ? true : false,
        user: user,
        login,
        logOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
