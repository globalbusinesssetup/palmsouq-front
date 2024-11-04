import React from 'react';
import Cart from './Cart';

export const metadata = {
  title: 'My Cart | Palmsouq',
  description: 'Palmsouq Cart Page',
};

const Page = () => {
  return (
    <main className="container mx-auto mt-6">
      <Cart />
    </main>
  );
};

export default Page;
