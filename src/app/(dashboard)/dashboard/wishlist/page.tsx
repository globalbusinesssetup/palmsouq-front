'use client';
import { ProductCard } from '@/components';
import { useGlobalContext } from '@/context/GlobalContext';
import React from 'react';

const Wishlist = () => {

  const {wishlistData:wishlist, wishlistLoading:isLoading} = useGlobalContext();

  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
      <div className="py-3.5 px-4 sm:px-6 flex items-center justify-between">
        <h5 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-700">
          My Wish List
        </h5>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-4 p-4 pt-2">
        {isLoading ? (
          Array(12)
            .fill('')
            .map((_, i) => (
              <div key={`sk_${i}`} className="max-h-[170px] animate-pulse">
                <div className="w-full rounded-md h-[128px] xs:h-[180px] sm:h-[220px] lg:h-[138px] bg-gray-200" />
                <div className="h-4 sm:h-5 w-full bg-gray-200 rounded-md mt-2 lg:mt-4" />
              </div>
            ))
        ) : wishlist?.length! > 0 ? (
          wishlist?.map((pd: any) => (
            <ProductCard key={pd.id} isWishList data={pd.product} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[270px] text-center w-full col-span-6">
            No items found
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
