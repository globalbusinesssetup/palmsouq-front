import axios, {
  Axios,
  AxiosInstance,
  AxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import config from '@/configs';

export const api = axios.create({
  baseURL: config.baseApi,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const authToken = Cookies.get('token');
    if (authToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }

    const response = await api<T>(url, config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      Cookies.remove('token');
      toast.error('Session expired');
      window.location.href = '/auth/login';
    }
    throw new Error('Failed to fetch data');
  }
};

export default fetcher;
