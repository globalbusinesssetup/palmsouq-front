// pages/social-callback.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

// Extend JwtPayload to include custom fields if necessary
interface CustomJwtPayload extends JwtPayload {
  exp: number;
  iat: number;
  aud: string;
  // Add any custom fields your JWT contains, e.g.:
  // user: { id: number; email: string };
}

const SocialCallback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token, user, email, name } = router.query;

      if (typeof token === 'string') {
        try {
          // Decode and verify the token
          const decoded = jwtDecode<CustomJwtPayload>(token);

          // Check if token has expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            throw new Error('Token has expired');
          }

          // Store user data in cookies or session
          Cookies.set('token', token as string, {
            secure: true,
            sameSite: 'lax',
            expires: dayjs(decoded.exp).toDate(),
          });

          // Redirect to home or desired page
          router.replace('/');
        } catch (error) {
          console.error('Invalid token', error);
          router.replace('/login'); // Redirect to login if token is invalid
        }
      }
    }
  }, [router.isReady, router.query]);

  return <p>Processing login...</p>;
};

export default SocialCallback;
