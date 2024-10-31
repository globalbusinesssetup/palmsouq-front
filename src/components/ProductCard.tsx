'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { ProductData } from '@/types';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { api } from '@/utils/fetcher';
import { VscLoading } from 'react-icons/vsc';
import config from '@/config';

const ProductCard = ({
  data,
  category,
}: {
  data?: ProductData;
  category?: string | number;
}) => {
  const { isLoggedIn, user, refetchProfile } = useAuth();
  const [image, setImage] = useState(config.imgUri + data?.image);
  const [isSubmitLoading, setSubmitLoading] = useState(false);
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
  const addToCart = async () => {
    if (!isLoggedIn) {
      toast.warn('Unauthorized! sign in first.');
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await api.post('/cart/action', {
        product_id: data?.id,
        // inventory_id: data?.inventory[0]?.id,
        quantity: 1,
        user_token: user?.email,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        refetchProfile();
        toast.success('Product add Successfully');
        // await router.push('/order');
      }
      console.log('add cart res =>', res);
    } catch (err) {
      console.log(err);
      toast.error('Error to add cart!');
    }
    setSubmitLoading(false);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border border-neutral-200 rounded-lg bg-white p-2 sm:p-3 max-h-[382px]"
    >
      <Link
        href={`/${category ?? 'sticker'}/${data?.id ?? 123}`}
        className="block w-full h-[120px] xs:h-[180px] sm:h-[220px] md:h-[200px] xl:h-[228px] rounded overflow-hidden bg-secondary relative"
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
      <div className="mt-2 py-2.5">
        <p className="text-xs text-success">Category name</p>
        <Link
          href={`/${category}/${data?.slug}/${data?.id}`}
          className="mt-1 flex items-center justify-between gap-x-3"
        >
          <h5 className="text-sm font-bold text-neutral-800 whitespace-nowrap overflow-hidden flex-1 text-ellipsis">
            {data?.title ?? 'Product Title goes here'}
          </h5>
          <HiArrowRight className="text-base text-success" />
        </Link>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          <span className="line-through">{data?.selling}</span> -{' '}
          {Number(data?.offered) > 0 ? offeredPercentage.toFixed() : 0}%
        </p>
      </div>
      <div className=" sm:pt-3 flex items-center justify-between gap-x-2.5">
        <div className="flex-1 flex items-center justify-center gap-x-1 h-7 py-1 rounded-full text-center bg-secondary text-xs xl:text-sm text-[#344054] font-medium">
          Price:{' '}
          <span className="font-semibold">
            {Number(data?.offered) > 0 ? data?.offered : data?.selling}
          </span>
        </div>
        <button
          onClick={addToCart}
          disabled={isSubmitLoading}
          className="flex-1 hidden sm:flex items-center justify-center gap-x-1 h-7 py-1 rounded-full text-center bg-secondary text-xs xl:text-sm text-[#344054] font-medium hover:bg-primary hover:text-white transition-all duration-300"
        >
          {isSubmitLoading ? (
            <VscLoading size={12} className="animate-spin" />
          ) : (
            'Add to cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
