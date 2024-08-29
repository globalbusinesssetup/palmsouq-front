'use client';
import React, { Suspense, useEffect } from 'react';
import SignIn from './SignIn';
import { Loader } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  });
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
};

export default RegisterPage;
