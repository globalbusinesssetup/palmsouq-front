import React from 'react';
import Cart from './Cart';

export const metadata = {
  title: 'My Cart | Shukransoouq',
  description: 'Shukransoouq Cart Page',
};

const Page = () => {
  return (
    <main className="container mx-auto mt-6 px-3 sm:px-0">
      <Cart />
    </main>
  );
};

export default Page;
