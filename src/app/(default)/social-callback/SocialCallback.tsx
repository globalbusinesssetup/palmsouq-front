'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

interface CustomJwtPayload extends JwtPayload {
  exp: number;
  iat: number;
  aud: string;
}

const SocialCallback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          throw new Error('Token has expired');
        }

        Cookies.set('token', token as string, {
          secure: true,
          sameSite: 'lax',
          expires: dayjs(decoded.exp).toDate(),
        });

        router.replace('/');
      } catch (error) {
        console.error('Invalid token', error);
        router.replace('/login');
      }
    }
  }, [router, searchParams]);

  return <p>Processing login...</p>;
};

export default SocialCallback;
