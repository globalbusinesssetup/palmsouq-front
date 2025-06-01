import React, { Suspense } from 'react';
import Checkout from './Checkout';
import { Loader } from '@/components';
export const metadata = {
  title: 'Checkout | Shukransoouq',
  description: 'Shukransoouq Checkout Page',
};

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Checkout />
    </Suspense>
  );
};

export default Page;
