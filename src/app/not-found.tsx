import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: 'Not Found',
};

const Page = () => {
  return (
    <div className="w-screen h-screen">
      <Image
        src={'/404.png'}
        fill
        alt="404"
        objectFit="contain"
        className="max-h-[70vh] h-fit m-auto"
      />
    </div>
  );
};

export default Page;
