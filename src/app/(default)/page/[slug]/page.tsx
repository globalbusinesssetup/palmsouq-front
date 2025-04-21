import React from 'react';
import Client from './client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Shukransoouq',
  description: 'Shukransoouq About Page',
};

const Page = ({ params }: any) => {
  return (
    <main className="container mx-auto pb-7 pt-5">
      <Client params={params} />
    </main>
  );
};

export default Page;
