import React, { Suspense } from 'react';
import SignIn from './SignIn';
import { Loader } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | Palmsouq',
  description: 'Palmsouq user Sign in',
};

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
};

export default RegisterPage;
