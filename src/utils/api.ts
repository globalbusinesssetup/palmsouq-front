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
  Setting,
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
        flash_sales: {
          id: number;
          public_products: {
            id: number;
            image: string;
            offered: string;
            product_id: number;
            selling: string;
          }[];
          title: string;
        }[];
        site_features: [];
        slider: {
          main: [];
          right_top: Banner & {
            title: string;
            slug: string;
            url: string | undefined;
          };
        };
        testimonials: {
          client_name: string;
          testimonial: string;
          rating: number;
        }[];
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
        about: [];
        setting: Setting;
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
export const getAbout = async (slug: string) => {
  try {
    const res = await fetcher<{
      data: {
        slug: string;
        title: string;
        description: string;
      };
    }>(`/page/${slug}`);
    return res ?? [];
  } catch (err) {
    console.error(err);
  }
};
type Brand = { id: number; image: string; slug: string; title: string };
export const getBrands = async () => {
  try {
    const res = await fetcher<{
      data: { data: Brand[] };
      current_page: number;
      last_page: number;
      total: number;
    }>('/brands');
    return res?.data?.data ?? []; // Return the data array directly
  } catch (err) {
    console.error('Failed to fetch brands:', err);
    return []; // Ensure a fallback return in case of failure
  }
};

export const getProducts = async (
  categorySlug: number | string,
  min?: any,
  max?: any,
  rating?: any,
  brands?: any,
  collections?: any,
  shipping?: any,
  sortby?: any
) => {
  try {
    const res = await fetcher<ProductsApiResponse>(
      `/all?category=${
        !categorySlug ? '' : categorySlug === 'brand' ? '' : categorySlug
      }&sortby=${sortby ?? ''}&shipping=${shipping ?? ''}&brand=${
        brands ?? ''
      }&collection=${collections ?? ''}&rating=${rating ?? ''}&max=${
        max ?? ''
      }&min=${min ?? ''}&page=&sidebar_data=true`
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
export const getSearchData = async (query: string) => {
  try {
    const { data } = await fetcher<{
      data: {
        category: {
          id: number;
          slug: string;
          image: string;
          title: string;
        }[];
        product: ProductData[];
        suggested: any[];
      };
    }>(`/search?q=${query}`);
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

export const getCart = async () => {
  const token = Cookies.get('user_token');
  try {
    const res = await fetcher<{ data: [] }>(
      `/cart/by-user?user_token=${token}`
    );
    return res ?? [];
  } catch (err) {
    console.error(err);
  }
};
export const getWishList = async () => {
  try {
    const res = await fetcher<{ data: { data: [] } }>(
      `/user/wishlist/all?order_by=created_at&type=desc&page=1`
    );
    return res?.data?.data ?? [];
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
      user_token: Cookies.get('user_token'),
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};
