'use client';
import {
  AuthContextTypes,
  CartItem,
  Categorydata,
  Country,
  LoginForm,
  Setting,
} from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { api } from '@/utils/fetcher';
import dayjs from 'dayjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCommon, getCountries, useGetUser } from '@/utils/api';

export const AuthContext = createContext<AuthContextTypes>({
  isLoggedIn: false,
  login: async () => ({ isSuccess: false }),
  logOut: () => {},
  refetchProfile: () => {},
  addOrders: () => {},
  removeOrders: () => {},
  isLoading: false,
  categories: [],
  languages: [],
  payment: [],
  social: [],
  about: [],
  default_language: {
    name: '',
    code: '',
  },
  ordersData: [],
  countries: {},
  userToken: '',
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(
    Cookies.get('token') || null
  );
  const [userToken, setUserToken] = useState<string | null>(
    Cookies.get('user_token') || null
  );
  const [isLoading, setLoading] = useState(false);
  const {
    data: common,
    isLoading: isCommonLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['common'],
    queryFn: getCommon,
  });
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    isSuccess: userSuccess,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['user', token],
    queryFn: useGetUser,
  });
  const { data: countriesPhones, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['countries-phones'],
    queryFn: getCountries,
  });
  const [countries, setCountries] = useState<{ [key: string]: Country }>({});
  const [languages, setLanguages] = useState<[]>([]);
  const [ordersData, setOrders] = useState<CartItem[] | []>([]);
  const [categories, setCategories] = useState<Categorydata[]>([]);
  const [payment, setPayment] = useState<[]>([]);
  const [social, setSocial] = useState<[]>([]);
  const [about, setAbout] = useState<[]>([]);
  const [defaultLanguage, setDefaultLanguage] = useState<{
    name: string;
    code: string;
  }>({ name: 'English', code: 'en' });
  const [setting, setSetting] = useState<Setting>();

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders && ordersData.length < 1) {
      setOrders(JSON.parse(storedOrders));
    }
    if (isSuccess) {
      setLanguages(common?.languages ?? []);
      setCategories(common?.categories ?? []);
      setPayment(common?.payment ?? []);
      setSocial(common?.social ?? []);
      setAbout(common?.about ?? []);
      setSetting(common?.setting);
      if (common?.default_language)
        setDefaultLanguage(common?.default_language);
    }
    if (!isCountriesLoading) {
      setCountries(countriesPhones?.countries!);
    }
  }, [isCommonLoading, common]);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    const userTokenFromCookie = Cookies.get('user_token');
    if (tokenFromCookie !== token) {
      setToken(tokenFromCookie ?? null);
    }
    if (userTokenFromCookie !== userToken) {
      setToken(userTokenFromCookie ?? null);
    }
  }, [Cookies.get('token')]);

  useEffect(() => {
    const userTokenFromCookie = Cookies.get('user_token');
    if (!userTokenFromCookie) {
      const token =
        Math.random().toString(36).slice(2, 5) +
        (+new Date() * Math.random()).toString(36).substring(0, 12) +
        Math.random().toString(36).slice(2, 5);
      Cookies.set('user_token', token);
    }
    if (userTokenFromCookie !== userToken) {
      setToken(userTokenFromCookie ?? null);
    }
  }, [Cookies.get('user_token')]);

  async function login(arg: LoginForm): Promise<{ isSuccess: boolean }> {
    setLoading(true);
    try {
      const res = await api.post('/user/signin', {
        ...arg,
        user_token: userToken,
      });
      const token = res.data?.data?.token;
      if (token) {
        Cookies.set('token', token as string, {
          secure: true,
          sameSite: 'lax',
          expires: dayjs(res.data?.data.expires_in).toDate(),
        });
        setToken(token);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/dashboard/profile');
        toast.success('Login succesfully');
        return { isSuccess: true };
      } else {
        toast.error(res.data.data.form[0]);
        return { isSuccess: false };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'An error occurred';
      } else {
        throw 'An unexpected error occurred';
      }
    } finally {
      setLoading(false);
    }
  }

  const addOrders = (products: CartItem[]) => {
    setOrders(products);
    localStorage.setItem('orders', JSON.stringify(products));
  };

  const removeOrders = () => {
    setOrders([]);
    localStorage.removeItem('orders');
  };

  const logOut = async () => {
    Cookies.remove('token');
    await queryClient.invalidateQueries({ queryKey: ['user'] });
    setOrders([]);

    try {
      await api.post('/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    toast.warn('Logged out!');
    await queryClient.resetQueries();
    router.push('/auth/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userToken: userToken,
        user: user?.data,
        login,
        logOut,
        refetchProfile,
        isLoading: userLoading || isLoading || isCommonLoading,
        categories,
        languages,
        payment,
        social,
        about,
        default_language: defaultLanguage,
        ordersData,
        addOrders,
        removeOrders,
        countries,
        setting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
