'use client';
import { AuthContextTypes, Categorydata, LoginForm } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { api } from '@/utils/fetcher';
import dayjs from 'dayjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCommon } from '@/utils/api';

export const AuthContext = createContext<AuthContextTypes>({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logOut: () => {},
  isLoading: false,
  categories: [],
  languages: [],
  payment: [],
  social: [],
  default_language: {
    name: '',
    code: '',
  },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: common, isLoading: isCommonLoading } = useQuery({
    queryKey: ['common'],
    queryFn: getCommon,
  });
  const [languages, setLanguages] = useState<[]>([]);
  const [categories, setCategories] = useState<Categorydata[]>([]);
  const [payment, setPayment] = useState<[]>([]);
  const [social, setSocial] = useState<[]>([]);
  const [defaultLanguage, setDefaultLanguage] = useState<{
    name: string;
    code: string;
  }>({ name: 'English', code: 'en' });

  useEffect(() => {
    if (!isCommonLoading) {
      setLanguages(common?.languages ?? []);
      setCategories(common?.categories ?? []);
      setPayment(common?.payment ?? []);
      setSocial(common?.social ?? []);
      if (common?.default_language)
        setDefaultLanguage(common?.default_language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        categories,
        languages,
        payment,
        social,
        default_language: defaultLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
