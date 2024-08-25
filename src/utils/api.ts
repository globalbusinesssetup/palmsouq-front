import {
  Address,
  Categorydata,
  Collection,
  ProductData,
  ProductResponse,
  ProductsApiResponse,
  ProfileApiResponse,
} from '@/types';
import fetcher, { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';

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
        banners: [];
        collections: Collection[];
        featured_brands: [];
        featured_categories: [];
        flash_sales: [];
        site_features: [];
        slider: {
          main: [];
          right_bottom: [];
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
export const getCategories = async () => {
  try {
    const res = await fetcher<{
      data: {
        categories: Categorydata[];
      };
    }>('/common');
    console.log('categories =>', res);
    return res ?? [];
  } catch (err) {
    console.error(err);
  }
};

export const getProducts = async (categorySlug: number | string) => {
  try {
    const { data } = await fetcher<ProductsApiResponse>(
      `/all?category=${categorySlug}`
    );
    return data?.result ?? [];
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
    const data = await fetcher(`/countries-phones`);
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
      time_zone: '',
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
