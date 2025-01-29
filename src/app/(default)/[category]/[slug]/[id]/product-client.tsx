'use client';
import { Button, Header, Modal } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { features, cardCategoryData } from '@/constants';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import { FaAngleDown, FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProduct, getWishList, useGetUser } from '@/utils/api';
import { api } from '@/utils/fetcher';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import config from '@/config';
import { FaAngleRight } from 'react-icons/fa6';
import ImageMagnifier from '@/components/common/ImageMagnifier';
import { temp_banner } from '@/utils/helper';
import Cookies from 'js-cookie';
import { register } from 'swiper/element/bundle';
import Rate from 'rc-rate';
import { IoClose } from 'react-icons/io5';
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillDislike,
  AiFillLike,
} from 'react-icons/ai';
register();

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
  const [wishListed, setWishListed] = useState(false);
  const queryClient = useQueryClient();
  const [rate, setRate] = useState(0);
  const [isRateOpen, setRateOpen] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(params.id),
  });

  const { data: wishlist, isLoading: wishListLoading } = useQuery({
    queryKey: ['wishlist', isLoggedIn],
    queryFn: () => getWishList(),
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
      const res = await api.post('/cart/buy-now', {
        product_id: product?.id,
        inventory_id: product?.inventory[0]?.id,
        quantity,
        user_token: token,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        refetchProfile();
        // toast.success('Product add Successfully');
        // addOrders(selectedProducts);
        router.push('/checkout');
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
        queryClient.refetchQueries({ queryKey: ['wishlist'] });
      }
      console.log('add wishlist res =>', res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (wishlist) {
      const isWishListed = wishlist?.some(
        (pd: any) => pd.product_id == params?.id
      );
      console.log('isWishListed =>', isWishListed);
      console.log('isWishListed =>', params?.id);
      console.log('isWishListed =>', wishlist);
      setWishListed(isWishListed);
    }
  }, [wishlist]);

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
  if ((product && 'form' in product && product.form) || isError) {
    return (
      <div className="w-full h-[calc(100vh-97px)] bg-[url('/not-found.webp')] bg-cover bg-no-repeat">
        <Link
          href={'/'}
          className="ml-5 px-5 py-3 text-white inline-block text-lg mt-5 font-semibold"
        >
          Go to Home
        </Link>
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
            <div className="flex items-center">
              <FaAngleRight size={12} />
              <Link href={`/${product?.category_data?.[0]?.slug}`}>
                <span className="text-primary hover:underline px-1">
                  {product?.category_data?.[0]?.title}
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
                  className="object-contain"
                />
              </div>
              <ImageMagnifier product={product} selectedImage={selectedImage} />
            </div>
            <swiper-container slides-per-view={4} space-between={16} navigation>
              <swiper-slide key={`img_`}>
                <div
                  onClick={() => setImage('')}
                  className={`w-full max-w-[156px] p-2 h-20 xs:h-24 lg:h-20 xl:h-[101px] rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 ${
                    selectedImage === ''
                      ? 'border-primary/50'
                      : 'border-transparent'
                  }`}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={config.imgUri + product?.image}
                      fill
                      alt="product image"
                      className=""
                    />
                  </div>
                </div>
              </swiper-slide>
              {product?.images?.map((pd, i) => (
                <swiper-slide key={`img_${i}`}>
                  <div
                    onClick={() => setImage(pd?.image)}
                    className={`w-full max-w-[156px] p-2 h-20 xs:h-24 lg:h-20 xl:h-[101px] rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 ${
                      selectedImage === pd?.image
                        ? 'border-primary/50'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full relative">
                      <Image
                        src={config.imgUri + pd?.image}
                        fill
                        alt="product image"
                        className=""
                      />
                    </div>
                  </div>
                </swiper-slide>
              ))}
            </swiper-container>
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
              <div className="flex items-center gap-x-2 font-semibold text-neutral-600">
                <Rate
                  value={product?.rating}
                  allowHalf
                  disabled
                  style={{ fontSize: '30px' }}
                />
                <p>{product?.rating}</p>
                <p>
                  ({product?.review_count}){' '}
                  <Link href={'#reviews'} className="hover:underline">
                    See reviews
                  </Link>
                </p>
              </div>
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
                <button
                  disabled={!isLoggedIn || wishListed}
                  onClick={addToWishlist}
                >
                  {wishListed ? (
                    <FaHeart size={26} />
                  ) : (
                    <FaRegHeart size={26} />
                  )}
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
              <div className="flex lg:hidden justify-end gap-x-4 mt-4">
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
                  onClick={buyNow}
                  className="h-11 w-[167px] bg-success border-success"
                >
                  Buy it Now
                </Button>
              </div>
              <div
                className="py-2.5 lg:py-4"
                dangerouslySetInnerHTML={{
                  __html: product?.overview?.split('\n').join('<br/>') || '',
                }}
              />
            </div>
            <div className="">
              <div className="hidden lg:flex justify-end gap-x-4 mt-8">
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
                  onClick={buyNow}
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
        <div className="mt-6 lg:mt-8 mb-10 border border-neutral-200 rounded-xl overflow-hidden">
          <Disclosure
            as="div"
            className={'overflow-hidden border-b border-neutral-200'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Description
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel
              translate="yes"
              className="pt-4 lg:pt-5 text-sm lg:text-base bg-white text-neutral-500 px-4 lg:px-5 pb-5 origin-top transition duration-700 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{
                  __html:
                    product?.description?.split('\n').join('<br/>') || 'n/a',
                }}
              />
            </DisclosurePanel>
          </Disclosure>
          <Disclosure
            as="div"
            className={'overflow-hidden border-b border-neutral-200'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Specifications
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="pt-4 lg:pt-5 text-sm lg:text-base bg-white text-neutral-500 px-4 lg:px-5 transition-all duration-0 pb-5">
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{
                  __html:
                    product?.specifications?.split('\n').join('<br/>') || 'n/a',
                }}
              />
            </DisclosurePanel>
          </Disclosure>
          <Disclosure
            as="div"
            className={'overflow-hidden border-b border-neutral-200'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Weight
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="pt-4 lg:pt-5 text-sm lg:text-base bg-white text-neutral-500 px-4 lg:px-5 transition-all duration-0 pb-5">
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{
                  __html: product?.weight?.split('\n').join('<br/>') || 'n/a',
                }}
              />
            </DisclosurePanel>
          </Disclosure>
          <Disclosure
            as="div"
            className={'overflow-hidden border-b border-neutral-200'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Dimension
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="pt-4 lg:pt-5 text-sm lg:text-base bg-white text-neutral-500 px-4 lg:px-5 transition-all duration-0 pb-5">
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{
                  __html:
                    product?.dimention?.split('\n').join('<br/>') || 'n/a',
                }}
              />
            </DisclosurePanel>
          </Disclosure>
          <Disclosure
            as="div"
            id="reviews"
            className={'overflow-hidden border-b border-neutral-200'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Reviews ({product?.review_count})
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="pt-4 lg:pt-5 bg-white px-4 lg:px-5 transition-all duration-0 pb-5">
              {/* <h2 className="text-5xl font-bold text-neutral-800">Reviews</h2> */}
              <div className="flex justify-between gap-x-10 px-6">
                <div className="flex-1 text-sm text-neutral-800">
                  <p>Rating Snapshot</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-x-3">
                      <p className="w-12">5 stars</p>
                      <div className="h-3 flex-1 border border-gray-400 rounded-full bg-gray-300 overflow-hidden">
                        <div className="w-2/3 h-full bg-primary" />
                      </div>
                      <p className="w-5">20</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <p className="w-12">4 stars</p>
                      <div className="h-3 flex-1 border border-gray-400 rounded-full bg-gray-300 overflow-hidden">
                        <div className="w-[10%] h-full bg-primary" />
                      </div>
                      <p className="w-5">1</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <p className="w-12">3 stars</p>
                      <div className="h-3 flex-1 border border-gray-400 rounded-full bg-gray-300 overflow-hidden">
                        <div className="w-1/6 h-full bg-primary" />
                      </div>
                      <p className="w-5">2</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <p className="w-12">2 stars</p>
                      <div className="h-3 flex-1 border border-gray-400 rounded-full bg-gray-300 overflow-hidden">
                        <div className="w-3/12 h-full bg-primary" />
                      </div>
                      <p className="w-5">2</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <p className="w-12">1 stars</p>
                      <div className="h-3 flex-1 border border-gray-400 rounded-full bg-gray-300 overflow-hidden">
                        <div className="w-1/12 h-full bg-primary" />
                      </div>
                      <p className="w-5">6</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-sm text-neutral-800">
                  <p>Overall Rating</p>
                  <div className="mt-4 flex items-end gap-x-4">
                    <h3 className="text-5xl font-semibold">3.9</h3>
                    <div className="">
                      <Rate value={4} disabled style={{ fontSize: 20 }} />
                      <p className="font-semibold">31 Reviews</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-sm text-neutral-800">
                  <p>Review this Product</p>
                  <Rate
                    value={rate}
                    onChange={(r) => {
                      if (isLoggedIn) {
                        setRateOpen(true);
                        setRate(r);
                      } else {
                        toast.warn('Unauthorized! sign in first.');
                      }
                    }}
                    style={{ fontSize: 40 }}
                  />
                  <p>
                    Adding a review will require a valid email for verification
                  </p>
                </div>
              </div>
              {/* <div className="mt-8 space-y-3 px-6">
                <div className="">
                  <div className="flex items-center gap-x-3">
                    <div className="size-9 rounded-full bg-primary flex items-center justify-center">
                      <p className="font-semibold text-center text-white">S</p>
                    </div>
                    <p className="text-neutral-800 text-sm">Shazzad Hossen</p>
                  </div>
                  <div className="mt-3 flex items-center gap-x-2 text-sm font-semibold text-neutral-600">
                    <Rate value={2} disabled />
                    <p className="text-xs font-normal text-neutral-500">
                      {'December 9, 2024'}
                    </p>
                  </div>
                  <p className="text-xs font-normal text-neutral-500 mt-2 lg:max-w-[60%]">
                    {`Title: Lag Issues on Low-End Devices. "I’ve been playing
                    Free Fire for a long time and always enjoyed the game.
                    However, after recent updates, I’ve noticed significant lag,
                    even on devices with 3GB RAM. The game used to run smoothly
                    on 2GB RAM, but now it lags, even with low graphics
                    settings. The lag makes it difficult to enjoy gameplay,
                    especially during battles. Please optimize the game for
                    low-end devices or release a lighter version to ensure a
                    better experience for all players."`}
                  </p>
                  <div className="flex items-center gap-x-2 mt-2">
                    <p className="text-xs font-normal text-neutral-500">
                      Helpful?{' '}
                    </p>
                    <button className="flex items-start gap-1">
                      <AiOutlineLike />
                      <p className="text-tiny font-normal text-neutral-500">
                        (0)
                      </p>
                    </button>
                    <button className="flex items-start gap-1">
                      <AiOutlineDislike />
                      <p className="text-tiny font-normal text-neutral-500">
                        (0)
                      </p>
                    </button>
                  </div>
                </div>
              </div> */}
            </DisclosurePanel>
          </Disclosure>
        </div>
        {product?.banner && (
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
        )}
      </div>
      <Modal show={isRateOpen} onClose={() => setRateOpen(false)}>
        <div className="">
          <div className="flex items-center justify-between mb-1">
            <p>Review this Product</p>
            <button onClick={() => setRateOpen(false)}>
              <IoClose size={20} />
            </button>
          </div>
          <Rate
            value={rate}
            onChange={(r) => setRate(r)}
            style={{ fontSize: 40 }}
          />
          <div className="">
            <label htmlFor="review" className="label">
              Review
            </label>
            <textarea
              id="review"
              maxLength={500}
              className="custom-input mt-1.5 text-sm "
              placeholder="Example: i bought this a month ago and i am so happy with it"
              rows={6}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
