import React, { Suspense } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import Checkout from './Checkout';
export const metadata = {
  title: 'Checkout | Palmsouq',
  description: 'Palmsouq Checkout Page',
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <main className="w-full h-full justify-center items-center">
          <BiLoaderAlt size={40} className="animate-spin" />
        </main>
      }
    >
      <Checkout />
    </Suspense>
  );
};

export default Page;
