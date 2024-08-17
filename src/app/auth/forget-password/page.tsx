import React, { Suspense } from 'react';
import ForgotPassword from './ForgotPassword';
import { LuLoader } from 'react-icons/lu';

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<LuLoader />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;
