'use client';
import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getBrands, getCategories } from '@/utils/api';
import Link from 'next/link';
import config from '@/config';

const BrandsClient = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });
  return (
    <div className="py-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-5 container mx-auto px-5">
      {isLoading ? (
        Array(16)
          .fill('')
          .map((_, i) => (
            <div key={`sk_${i}`} className="max-h-[170px]">
              <div className="w-full rounded-md h-[128px] xs:h-[180px] sm:h-[220px] lg:h-[138px] bg-gray-200 animate-pulse" />
              <div className="h-4 sm:h-5 w-full bg-gray-200 rounded-md mt-2 lg:mt-4" />
            </div>
          ))
      ) : isError ? (
        <p className="col-span-full text-center pt-5">Failed fetch brand</p>
      ) : (
        data?.map((b, i) => (
          <Link
            href={`/categories/brand?sortby=&shipping=&brand=${b?.id}&collection=&rating=0&max=0&min=0&page=`}
            key={b?.id}
            className=""
          >
            <div className=" h-24 sm:h-[140px] mx-1 mb-4 overflow-hidden rounded-md bg-gray-200 flex items-center justify-center">
              <Image
                src={config.imgUri + b.image}
                width={100}
                height={100}
                alt="cat image"
                loading="lazy"
                className="object-contain size-20 sm:size-[100px]"
              />
            </div>
            <p className="flex-1 overflow-hidden text-ellipsis text-center mt-4 text-sm lg:text-base">
              {b?.title}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default BrandsClient;
