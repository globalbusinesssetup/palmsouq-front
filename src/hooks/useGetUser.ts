import { ProfileApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

const useGetUser = async () => {
  try {
    const data = await fetcher<ProfileApiResponse>('/user/profile');
    return data;
  } catch (err) {
    console.error(err);
  }
};
export default useGetUser;
