'use client';
import { AuthContextTypes, LoginForm } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import fetcher, { api } from '@/utils/fetcher';
import dayjs from 'dayjs';
import { QueryClient, useQuery } from '@tanstack/react-query';
import useGetUser from '@/hooks/useGetUser';

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
  const token = Cookies.get('token');
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: useGetUser,
    enabled: token ? false : true,
  });

  async function login(arg: LoginForm) {
    try {
      const res = await api.post('/user/signin', { ...arg });
      Cookies.set('token', res.data?.data.token as string, {
        secure: true,
        sameSite: 'lax',
        expires: dayjs(res.data?.data.expires_in).toDate(),
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      await router.push('/dashboard/profile');
      toast.success('Login succesfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'An error occurred';
      } else {
        throw 'An unexpected error occurred';
      }
    }
  }

  const logOut = () => {
    Cookies.remove('token');
    toast.warn('Logged out!');
    router.push('/auth/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: token ? true : false,
        user: user?.data ?? {},
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
