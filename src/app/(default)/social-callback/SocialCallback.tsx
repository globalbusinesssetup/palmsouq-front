'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import useAuth from '@/hooks/useAuth';

interface CustomJwtPayload extends JwtPayload {
  exp: number;
  iat: number;
  aud: string;
}

const SocialCallback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {socialLogin} = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        socialLogin({token});
      } catch (error) {
        console.error('Invalid token', error);
        router.replace('/login');
      }
    }
  }, [router, searchParams]);

  return <p>Processing login...</p>;
};

export default SocialCallback;
