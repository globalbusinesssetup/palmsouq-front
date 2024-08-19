import { ProductsApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export const useGetProducts = async () => {
  try {
    const { data } = await fetcher<ProductsApiResponse>('/products');
    return data.result;
  } catch (err) {
    console.error(err);
  }
};
