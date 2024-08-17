import React, { Suspense } from 'react';
import Register from './Register';
import { LuLoader } from 'react-icons/lu';

const RegisterPage = () => {
  return (
    <Suspense fallback={<LuLoader />}>
      <Register />
    </Suspense>
  );
};

export default RegisterPage;
