import {
  Address,
  Categorydata,
  ProductData,
  ProductsApiResponse,
  ProfileApiResponse,
} from '@/types';
import fetcher from '@/utils/fetcher';

export const useGetUser = async () => {
  try {
    const data = await fetcher<ProfileApiResponse>('/user/profile');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getCommons = async () => {
  try {
    const res = await fetcher('/common');
    return res ?? [];
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
export const getProduct = async ({
  categoryId,
  id,
}: {
  categoryId: string | number;
  id: string | number;
}) => {
  try {
    const { data } = await fetcher<{ data: ProductData }>(
      `/product/${categoryId}?id=${id}`
    );
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
