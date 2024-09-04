import {
  Address,
  Banner,
  Categorydata,
  Collection,
  ProductData,
  ProductResponse,
  ProductsApiResponse,
  ProfileApiResponse,
  Country,
} from '@/types';
import fetcher, { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';
import { timezone } from './helper';

export const useGetUser = async () => {
  try {
    const data = await fetcher<ProfileApiResponse>('/user/profile');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getHome = async () => {
  try {
    const { data } = await fetcher<{
      data: {
        banners: Banner[];
        collections: Collection[];
        featured_brands: [];
        featured_categories: [];
        flash_sales: [];
        site_features: [];
        slider: {
          main: [];
          right_bottom: Banner & {
            title: string;
            slug: string;
            url: string | undefined;
          };
        };
      };
    }>('/home');
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const getCommon = async () => {
  try {
    const { data } = await fetcher<{
      data: {
        categories: Categorydata[];
        languages: [];
        payment: [];
        social: [];
        setting: {
          default_country: string;
          default_state: string;
          email: string;
          phone: number;
        };
        default_language: {
          name: string;
          code: string;
        };
      };
    }>('/common');
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const getPayMethods = async () => {
  try {
    const { data } = await fetcher<{
      data: {
        stripe_key: string;
        stripe_secret: string;
        stripe: number;
      };
    }>('/payment-gateway');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetcher<{
      data: {
        categories: Categorydata[];
      };
    }>('/common');
    return res ?? [];
  } catch (err) {
    console.error(err);
  }
};

export const getProducts = async (categorySlug: number | string) => {
  try {
    const res = await fetcher<ProductsApiResponse>(
      `/all?category=${categorySlug}&sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&page=&sidebar_data=false`
    );
    return res.data ?? {};
  } catch (err) {
    console.error(err);
  }
};
export const getProduct = async (id: string | number) => {
  try {
    const { data } = await fetcher<ProductResponse>(`/product/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const getAddress = async (page?: number) => {
  try {
    const { data } = await fetcher<{
      data: { data: Address[]; current_page: number; last_page: number };
    }>(`/user/address/all?page=${page ?? 1}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getCart = async (token: string) => {
  try {
    const res = await fetcher<{ data: [] }>(
      `/cart/by-user?user_token=${token}`
    );
    return res ?? [];
  } catch (err) {
    console.error(err);
  }
};

export const getCountries = async () => {
  try {
    const { data } = await fetcher<{
      data: {
        countries: { [key: string]: Country };
        phones: { [key: string]: string };
      };
    }>(`/countries-phones`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getOrders = async () => {
  try {
    const { data } = await api.post<{
      data: {
        current_page: string;
        data: [];
      };
    }>(`/order/by-user`, {
      time_zone: timezone,
      order_by: 'created_at',
      page: 1,
      q: null,
      user_token: Cookies.get('token'),
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};
