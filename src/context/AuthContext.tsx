'use client';
import { AuthContextTypes, LoginForm } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { SWRConfig, SWRConfiguration } from 'swr';
import useSWRMutation from 'swr/mutation';
import Cookies from 'js-cookie';
import fetcher, { api } from '@/utils/fetcher';
import dayjs from 'dayjs';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
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
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function login(arg: LoginForm) {
    setIsLoading(true);
    try {
      const res = await api.post('/user/signin', { ...arg });
      Cookies.set('token', res.data?.data.token as string, {
        secure: true,
        sameSite: 'lax',
        expires: dayjs(res.data?.data.expires_in).toDate(),
      });
      setUser(res.data?.data.user);
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
    setIsLoading(false);
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
      <QueryClientProvider client={queryClient}>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <AiOutlineLoading3Quarters size={30} className=" animate-spin" />
          </div>
        ) : (
          children
        )}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
