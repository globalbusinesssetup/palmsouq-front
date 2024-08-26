'use client';
import React, { Suspense } from 'react';
import SignIn from './SignIn';
import { Loader } from '@/components';

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
};

export default RegisterPage;
