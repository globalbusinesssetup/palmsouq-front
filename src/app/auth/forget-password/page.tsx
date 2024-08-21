'use client';
import React, { Suspense } from 'react';
import ForgotPassword from './ForgotPassword';
import { Loader } from '@/components';

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;
