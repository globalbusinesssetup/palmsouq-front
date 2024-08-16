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

export const AuthContext = createContext<AuthContextTypes>({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logOut: () => {},
  isLoading: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function userLogin(url: string, { arg }: { arg: LoginForm }) {
    setIsLoading(true);
    try {
      const res = await api.post(url, { ...arg });
      Cookies.set('token', res.data?.data.token as string, {
        secure: true,
        sameSite: 'lax',
        expires: dayjs(res.data?.data.expires_in).toDate(),
      });
      setUser(res.data?.data.user);
      await router.push('/');
      toast.success('Login succesfully');
      console.log('res =>>', res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'An error occurred';
      } else {
        throw 'An unexpected error occurred';
      }
    }
    setIsLoading(false);
  }

  const { trigger: login } = useSWRMutation('/user/signin', userLogin);

  const logOut = () => {
    setToken(null);
    toast.warn('Logged out!');
    router.push('/auth/sign-in');
  };

  const swrConfig: SWRConfiguration = {
    fetcher: (resource) => fetcher(resource),
  };

  useEffect(() => {
    // const initialize = async () => {
    //   // const query = router.query;
    //   // if (query?.token) {
    //   //   setToken(query.token as string);
    //   //   Cookies.set('token', query.token as string, {
    //   //     secure: true,
    //   //     sameSite: 'lax',
    //   //     // expires in 30 minutes
    //   //     expires: dayjs('2024-09-16T09:53:02.071481Z').toDate(),
    //   //   });

    //   //   await router.push('/');
    //   //   toast.success('Login succesfully');
    //   // } else {
    //   //   const storedToken = Cookies.get('token');
    //   //   if (storedToken) {
    //   //     setToken(storedToken);
    //   //   } else {
    //   //     await router.push('/auth/login');
    //   //   }
    //   // }
    //   const storedToken = Cookies.get('token');
    //   if (storedToken) {
    //     setToken(storedToken);
    //   } else {
    //     await router.push('/auth/login');
    //   }
    //   setIsLoading(false);
    // };

    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push('/auth/sign-in');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: token ? true : false,
        user: {
          token,
          ...user,
        },
        login,
        logOut,
        isLoading,
      }}
    >
      <SWRConfig value={swrConfig}>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <AiOutlineLoading3Quarters size={30} className=" animate-spin" />
          </div>
        ) : (
          children
        )}
      </SWRConfig>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
