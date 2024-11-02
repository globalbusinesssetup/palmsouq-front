'use client';
import { Button, Header } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { features, cardCategoryData } from '@/constants';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FaAngleDown, FaRegHeart } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProduct, useGetUser } from '@/utils/api';
import { api } from '@/utils/fetcher';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import config from '@/config';
import { FaAngleRight } from 'react-icons/fa6';
import ImageMagnifier from '@/components/common/ImageMagnifier';
import { temp_banner } from '@/utils/helper';
import Cookies from 'js-cookie';

type CategoryProps = {
  params: {
    category: string;
    id: string | number;
  };
};

export default function ProductDeatils({ params }: Record<string, any>) {
  const router = useRouter();
  const { user, isLoggedIn, refetchProfile, addOrders } = useAuth();
  const [selectedType, setType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setImage] = useState('');
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(params.id),
  });

  const handleQuantity = (type: 'minus' | 'plus' | number) => {
    if (quantity > 9 && type === 'plus') {
      toast.warn('Maximum quantity exceeds.!!');
      return;
    }
    if (type === 'plus') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'minus') {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(type);
    }
  };

  const addToCart = async () => {
    // if (!isLoggedIn) {
    //   toast.warn('Unauthorized! sign in first.');
    //   return;
    // }
    const token = Cookies.get('user_token');
    setSubmitLoading(true);
    try {
      const res = await api.post('/cart/action', {
        product_id: product?.id,
        inventory_id: product?.inventory[0]?.id,
        quantity,
        user_token: token,
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
    }
    setSubmitLoading(false);
  };
  const buyNow = async () => {
    // if (!isLoggedIn) {
    //   toast.warn('Unauthorized! sign in first.');
    //   return;
    // }
    const token = Cookies.get('user_token');
    setSubmitLoading(true);
    try {
      const res = await api.post('/cart/action', {
        product_id: product?.id,
        inventory_id: product?.inventory[0]?.id,
        quantity,
        user_token: token,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        refetchProfile();
        toast.success('Product add Successfully');
        // addOrders(selectedProducts);
        // router.push('/checkout');
      }
      console.log('add cart res =>', res);
    } catch (err) {
      console.log(err);
    }
    setSubmitLoading(false);
  };
  const addToWishlist = async () => {
    if (!isLoggedIn) {
      toast.warn('Unauthorized! sign in first.');
      return;
    }
    try {
      const res = await api.post('/user/wishlist/action', {
        product_id: product?.id,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        toast.success(res.data?.message);
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      }
      console.log('add wishlist res =>', res);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <div className="w-full h-20 bg-gray-200 animate-pulse" />
        <div className="flex gap-x-10 container mx-auto mt-10">
          <div className="lg:w-5/12 h-[70vh]">
            <div className="w-ful h-[50vh] bg-gray-200 animate-pulse rounded-lg" />
            <div className="w-ful h-[8vh] bg-gray-200 animate-pulse rounded-lg mt-5" />
            <div className="w-ful h-[8vh] bg-gray-200 animate-pulse rounded-lg mt-5" />
          </div>
          <div className="flex-1 h-[70vh] bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-6 sm:mt-8 bg-[#FCFCFD] px-4">
        <nav aria-label="breadcrumb" className="pb-6">
          <div className="flex flex-wrap space-x-1">
            {/* Home link */}
            <div>
              <Link href="/">
                <span className="text-primary hover:underline">Home</span>
              </Link>
            </div>
            <div key={'/'} className="flex items-center">
              <FaAngleRight size={12} />
              <Link href={`/${product?.category_data[0]?.slug}`}>
                <span className="text-primary hover:underline px-1">
                  {product?.category_data[0]?.title}
                </span>
              </Link>
              <FaAngleRight size={12} />
            </div>
            <div className="!ml-0">
              <span className="text-gray-500">{product?.title}</span>
            </div>
          </div>
        </nav>
        <div className="p-3 sm:p-4 md:p-5 xl:p-6 border border-neutral-200 bg-white rounded-xl lg:flex gap-x-6 xl:gap-x-8 space-y-6 lg:space-y-0">
          {/* Left side  */}
          <div className="lg:w-5/12">
            <div className="p-3">
              <div className="w-full h-60 xs:h-[300px] sm:h-[396px] lg:hidden rounded-lg overflow-hidden relative bg-secondary">
                <Image
                  src={
                    selectedImage
                      ? `${config.imgUri + selectedImage}`
                      : `${config.imgUri + product?.image}`
                  }
                  onError={() => setImage(config.imgUri + config.defaultImage)}
                  fill
                  alt={product?.image ?? 'product image'}
                  // className="object-cover"
                />
              </div>
              <ImageMagnifier product={product} selectedImage={selectedImage} />
            </div>
            <div className="flex items-center gap-x-2 xs:gap-x-3 xl:gap-x-4 mt-4">
              {product?.images?.map((pd, i) => (
                <div
                  key={`image_${i}`}
                  onClick={() => {
                    pd?.image === selectedImage
                      ? setImage('')
                      : setImage(pd?.image);
                  }}
                  className={`w-full max-w-[156px] p-2 h-20 xs:h-24 lg:h-20 xl:h-[101px] rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 ${
                    selectedImage === pd?.image
                      ? 'border-primary/50'
                      : 'border-transparent'
                  }`}
                >
                  <div className="p-2 w-full h-full relative">
                    <Image
                      src={config.imgUri + pd?.image}
                      fill
                      alt="product image"
                      className=""
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 py-4 px-[30px] flex items-center justify-center gap-x-4 border border-neutral-100 bg-neutral-100 rounded-lg">
              <Image
                src={'/icons/free-delivery.svg'}
                width={105}
                height={38}
                alt="icon"
                className=" w-20 h-8 xs:w-[105px] xs:h-[38px]"
              />
              <div className="flex-1 text-center">
                <p className="text-tiny xl:text-xs text-neutral-700">
                  Express, Free Delivery
                </p>
                <h4 className="text-xs xl:text-sm text-neutral-900 font-bold">
                  Dubai, Sharjah and Ajman
                </h4>
              </div>
              <Image
                src={'/icons/any-location.svg'}
                width={75}
                height={40}
                alt="icon"
                className="hidden xs:block"
              />
            </div>
            <div className="mt-4 py-[18px] flex flex-wrap items-center justify-center gap-4 px-2 border border-neutral-100 bg-neutral-100 rounded-lg">
              {features.slice(1).map((feature, i) => (
                <div
                  key={`feature_${i}`}
                  className="flex items-center gap-x-2 xl:gap-x-3"
                >
                  <div className="size-4 xs:size-6 xl:size-[33px] relative rounded-full flex items-center justify-center bg-neutral-50">
                    <Image src={feature.icon} fill alt="icon" />
                  </div>
                  <div className="">
                    <h6 className="text-tiny leading-[17px] font-semibold text-neutral-700">
                      {feature.title}
                    </h6>
                    <p className="text-[8px] leading-[9px] text-neutral-500">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="">
              <p className="font-medium text-success text-sm lg:text-base">
                {product?.category_data?.[0]?.title}
              </p>
              <h2 className="text-xl lg:text-2xl text-black font-semibold mt-1">
                {product?.title}
              </h2>
              <div className="flex flex-row items-center gap-x-3 border-b border-[#E6E6E6]">
                <div className="flex-1 flex flex-wrap items-center gap-2 xl:gap-3 py-4">
                  <p
                    className={`flex items-center justify-center text-xs xl:text-sm font-medium px-4 xl:px-5 h-8 xl:h-[34px] rounded-full text-neutral-600 bg-neutral-100`}
                  >
                    {product?.sku}
                  </p>
                  <p
                    className={`flex items-center justify-center text-xs xl:text-sm font-medium px-4 xl:px-5 h-8 xl:h-[34px] rounded-full text-neutral-600 bg-neutral-100`}
                  >
                    {product?.category_data?.[0]?.title}
                  </p>
                  <p
                    className={`flex items-center justify-center text-xs xl:text-sm font-medium px-4 xl:px-5 h-8 xl:h-[34px] rounded-full text-neutral-600 bg-neutral-100`}
                  >
                    {product?.brand?.title}
                  </p>
                  <p
                    className={`flex items-center justify-center text-xs xl:text-sm font-medium px-4 xl:px-5 h-8 xl:h-[34px] rounded-full text-neutral-600 bg-neutral-100`}
                  >
                    {Number(product?.stock) > 0 ? 'In Stock' : 'Stock out'}
                  </p>
                </div>
                <button disabled={!isLoggedIn} onClick={addToWishlist}>
                  <FaRegHeart size={26} />
                </button>
              </div>
              <div className="flex items-end justify-between pt-8 pb-4">
                <div className="">
                  <label className="text-sm font-medium text-[#344054]">
                    Quantity
                  </label>
                  <div className="flex items-center gap-x-3.5 px-4 py-2.5 lg:py-3.5 border border-[#D0D5DD] rounded-lg mt-2">
                    <button
                      disabled={quantity === 1}
                      onClick={() => handleQuantity('minus')}
                      className="size-5 lg:size-7 flex items-center justify-center rounded bg-neutral-100"
                    >
                      <FiMinus />
                    </button>
                    <input
                      value={quantity}
                      onChange={(e: any) => setQuantity(e.target.value)}
                      type="number"
                      className="w-8 sm:w-9 lg:w-11 focus-visible:outline-none pb-1 border-b text-[#344054] no-number-input-appearance m-0 text-center text-sm lg:text-base"
                    />
                    <button
                      disabled={quantity === Number(product?.stock)}
                      onClick={() => handleQuantity('plus')}
                      className="size-5 lg:size-7 flex items-center justify-center rounded bg-neutral-100"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div className="px-4 sm:px-6 py-2 rounded-lg bg-[#F8F9FC]">
                  <h4 className="md:text-lg lg:text-xl text-[#4E5BA6] font-bold">
                    {(product?.offered ?? product?.selling ?? 0) * quantity} AED
                  </h4>
                  <p className="text-tiny sm:text-xs lg:text-sm text-neutral-500">
                    Estimated Total (Exc. Vat)
                  </p>
                </div>
              </div>
              <div
                className="py-2.5 lg:py-4"
                dangerouslySetInnerHTML={{ __html: product?.overview || '' }}
              />
            </div>
            <div className="">
              <div className="flex justify-end gap-x-4 mt-8">
                <Button
                  disabled={Number(product?.stock) < 1}
                  loading={isSubmitLoading}
                  onClick={addToCart}
                  className="h-11 w-[167px]"
                >
                  Add to Cart
                </Button>
                <Button
                  disabled={Number(product?.stock) < 1}
                  loading={isSubmitLoading}
                  onClick={addToCart}
                  className="h-11 w-[167px] bg-success border-success"
                >
                  Buy it Now
                </Button>
              </div>
              <div className="mt-5 sm:mt-8 px-3 sm:px-4 py-1 xs:py-2 sm:py-3 xl:py-3.5 border border-dashed border-neutral-400 rounded-lg xl:rounded-[10px] flex items-center justify-between">
                <p className="text-tiny sm:text-xs xl:text-sm text-neutral-600 flex-1">
                  Based on selection, your order will be ready within next
                </p>
                <span className="text-tiny sm:text-xs xl:text-sm text-[#3F206A] whitespace-nowrap font-medium py-1 px-2 sm:px-3 bg-neutral-100 border rounded-full border-[#EAECF0]">
                  24 Business Hours
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 lg:mt-8 pb-10">
          <Disclosure
            as="div"
            className={'border border-neutral-200 rounded-xl overflow-hidden'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Product Description
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="pt-4 lg:pt-5 text-sm lg:text-base bg-white text-neutral-500 px-4 lg:px-5 transition-all duration-0 pb-5">
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{ __html: product?.description || '' }}
              />
            </DisclosurePanel>
          </Disclosure>
        </div>
        <div className="w-full h-[150px] md:h-[180px] lg:h-[200px] bg-secondary rounded-md mt-6 relative overflow-hidden mb-6">
          <Image
            src={bannerError ? temp_banner : config.imgUri + product?.banner}
            fill
            alt={'Product banner'}
            onError={() => setBannerError(true)}
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
