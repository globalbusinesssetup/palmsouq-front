'use client';
import React from 'react';
import Image from 'next/image';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { getAllCategories } from '@/utils/api';
import Link from 'next/link';
import config from '@/config';
import { ImSpinner6 } from 'react-icons/im';

type Brand = { id: number; image: string; slug: string; title: string };

const CategriesClient = () => {
  
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['brands'],
    queryFn: ({ pageParam }) => getAllCategories(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  return (
    <div className="py-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-3 sm:gap-5 container mx-auto px-5">
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
        <p className="col-span-full text-center pt-5">
          Failed fetch categories
        </p>
      ) : (
        data?.pages
          ?.flatMap((page) => page.categories)
          ?.map((c, i) => (
            <Link
              href={`/${c?.slug}?sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&page=`}
              key={c?.id}
              className=""
            >
              <div className=" h-24 sm:h-[140px] mx-1 mb-4 overflow-hidden rounded-md border border-gray-200 flex items-center justify-center">
                <Image
                  src={config.imgUri + c.image}
                  width={100}
                  height={100}
                  alt="cat image"
                  loading="lazy"
                  className="object-contain size-20 sm:size-[100px]"
                />
              </div>
              <p className="flex-1 overflow-hidden text-ellipsis text-center text-sm lg:text-base">
                {c?.title}
              </p>
            </Link>
          ))
      )}
      {hasNextPage ? (
        <div className="col-span-full flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="flex justify-center items-center w-32 py-3 text-sm border text-primary border-gray-200 rounded-md"
          >
            {isFetchingNextPage ? (
              <ImSpinner6 className="animate-spin text-lg" />
            ) : (
              'Load More'
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CategriesClient;
