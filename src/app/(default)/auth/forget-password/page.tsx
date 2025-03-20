import React, { Suspense } from 'react';
import ForgotPassword from './ForgotPassword';
import { Loader } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot password | Palmsouq',
  description: 'Palmsouq user Forgot password',
};

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;
