import React, { Suspense } from 'react';
import Register from './Register';
import { Loader } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | Shukransoouq',
  description: 'Shukransoouq user Register',
};

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Register />
    </Suspense>
  );
};

export default RegisterPage;
