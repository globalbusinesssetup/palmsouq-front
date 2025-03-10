'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { ProductData } from '@/types';
import { VscLoading } from 'react-icons/vsc';
import config from '@/config';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useGlobalContext } from '@/context/GlobalContext';

const ProductCard = ({
  data,
  category,
  isWishList = false,
  isFeatured = false,
}: {
  data?: ProductData;
  category?: string | number;
  isWishList?: boolean;
  isFeatured?: boolean;
}) => {
  const { addToCart, isAddToCartLoading, addToWishlist, isAddWishListLoading } =
    useGlobalContext();
  const [image, setImage] = useState(config.imgUri + data?.image);
  const [isHover, setHover] = useState(false);

  const handleError = () => {
    setImage('/default-image.webp'); // fallback image path
  };

  const offeredPercentage = data?.selling
    ? ((parseFloat(data?.selling as string) -
        parseFloat(data?.offered as string)) /
        parseFloat(data?.selling as string)) *
      100
    : 0;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border border-neutral-200 rounded-lg bg-white p-2 sm:p-3 max-h-[382px] relative"
    >
      <Link
        href={`/${category}/${data?.slug}/${data?.id}`}
        className={`block w-full h-[120px] xs:h-[180px] border border-gray-100 rounded-md ${
          isFeatured ? '' : 'sm:h-[220px] md:h-[200px] xl:h-[228px]'
        } rounded overflow-hidden relative`}
      >
        <swiper-container
          className="w-full"
          style={{ height: '100%' }}
          autoplay={isHover}
          onSwiper={(s) => {
            if (isHover) {
              s.autoplay.start();
            } else {
              s.autoplay.stop();
            }
          }}
        >
          {Array(3)
            .fill(' ')
            .map((_, i) => (
              <swiper-slide
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                key={`pd_image_${i}`}
              >
                <Image
                  src={image}
                  fill
                  alt={data?.image ?? 'product image'}
                  className="object-contain py-2"
                  onError={handleError}
                />
              </swiper-slide>
            ))}
        </swiper-container>
      </Link>
      {isWishList && (
        <button
          onClick={() => addToWishlist(data?.id)}
          disabled={isAddWishListLoading}
          className="absolute top-2 right-2 text-lg size-10 flex items-center justify-center border border-gray-200 bg-secondary z-50 rounded-full text-error hover:border-error/20"
        >
          {isAddWishListLoading ? (
            <VscLoading size={20} className="animate-spin" />
          ) : (
            <FaRegTrashCan />
          )}
        </button>
      )}
      <div className="mt-2 py-2.5">
        {/* <p className="text-xs text-success">Category name</p> */}
        <Link
          href={`/${category}/${data?.slug}/${data?.id}`}
          className="mt-1 flex items-center justify-between gap-x-3"
        >
          <h5 className="text-xs xs:text-sm font-bold text-neutral-800 whitespace-nowrap overflow-hidden flex-1 text-ellipsis">
            {data?.title ?? 'Product Title goes here'}
          </h5>
          <HiArrowRight className="text-sm xs:text-base text-success" />
        </Link>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          <span className="line-through">{data?.selling}</span> -{' '}
          {Number(data?.offered) > 0 ? offeredPercentage.toFixed() : 0}%
        </p>
      </div>
      {!isWishList && (
        <div className=" sm:pt-3 flex items-center justify-between gap-x-2.5">
          <div className="flex-1 flex items-center justify-center gap-x-1 h-7 py-1 rounded-full text-center bg-secondary text-xs text-[#344054] font-medium">
            Price:{' '}
            <span className="font-semibold">
              {Number(data?.offered) > 0 ? data?.offered : data?.selling}
            </span>
          </div>
          <button
            onClick={() =>
              addToCart({
                productId: data?.id,
                inventoryId: data?.inventory?.[0]?.id,
                qty: 1,
              })
            }
            disabled={isAddToCartLoading}
            className="flex-1 hidden sm:flex items-center justify-center gap-x-1 h-7 py-1 rounded-full text-center bg-secondary text-xs text-[#344054] font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            {isAddToCartLoading ? (
              <VscLoading size={12} className="animate-spin" />
            ) : (
              'Add to cart'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
