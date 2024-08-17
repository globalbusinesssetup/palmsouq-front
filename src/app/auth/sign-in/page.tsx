import React, { Suspense } from 'react';
import SignIn from './SignIn';
import { LuLoader } from 'react-icons/lu';

const RegisterPage = () => {
  return (
    <Suspense fallback={<LuLoader />}>
      <SignIn />
    </Suspense>
  );
};

export default RegisterPage;
