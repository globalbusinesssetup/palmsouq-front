import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { ProductData } from '@/types';

const ProductCard = ({ data }: { data?: ProductData }) => {
  return (
    <div className="border border-neutral-200 rounded-lg bg-white p-2 sm:p-3">
      <Link
        href={`/categories/stickers/${data?.slug ?? 123}`}
        className="block w-full h-[228px] xs:h-[180px] sm:h-[220px] md:h-[200px] xl:h-[228px] rounded overflow-hidden bg-secondary relative"
      >
        <Image
          src={
            data?.image
              ? `http://printcraft.ae/uploads/${data?.image}`
              : '/categories/paper-bags.png'
          }
          fill
          alt={data?.image ?? 'product image'}
          className="object-fill"
        />
      </Link>
      <div className="mt-2 py-2.5">
        <p className="text-xs text-success">Product name</p>
        <Link
          href={`/categories/stickers/${data?.slug ?? 123}`}
          className="mt-1 flex items-center justify-between gap-x-3"
        >
          <h5 className="text-sm font-bold text-neutral-800 whitespace-nowrap overflow-hidden flex-1">
            {data?.title ?? 'Product Title goes here'}
          </h5>
          <HiArrowRight className="text-base text-success" />
        </Link>
        <p className="text-xs text-neutral-400 mt-1">Sub content goes here</p>
      </div>
      <div className="pt-3 flex items-center justify-between gap-x-2.5">
        <div className="flex-1 flex items-center justify-center gap-x-1 h-7 py-1 rounded-full text-center bg-secondary text-xs xl:text-sm text-[#344054] font-medium">
          Quantity:{' '}
          <span className="font-semibold">{data?.selling ?? 100}</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-x-1 h-7 py-1 rounded-full text-center bg-secondary text-xs xl:text-sm text-[#344054] font-medium">
          Price:{' '}
          <span className="font-semibold">
            {data?.offered.toFixed() ?? 50.0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
