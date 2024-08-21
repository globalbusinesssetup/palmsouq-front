'use client';
import React, { Suspense } from 'react';
import Register from './Register';
import { Loader } from '@/components';

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Register />
    </Suspense>
  );
};

export default RegisterPage;
