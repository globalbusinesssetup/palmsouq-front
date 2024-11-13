'use client';
import { Image } from '@/components';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { RiUserSharedLine, RiWhatsappFill } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FiPlus, FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FaBars, FaGifts } from 'react-icons/fa6';
import useAuth from '@/hooks/useAuth';
import { getSearchData, useGetUser } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@headlessui/react';
import { BsBookmarkStar } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa6';
import config from '@/config';
import { usePathname } from 'next/navigation';

const Header = ({ showSearch = false }: { showSearch?: boolean }) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoggedIn, isLoading, user: profile } = useAuth();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [isFocus, setFocus] = useState(true);
  const {
    data,
    isRefetching: isSearchLoading,
    refetch,
  } = useQuery({
    queryKey: ['search_data'],
    queryFn: () => getSearchData(query),
    enabled: false,
  });

  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query && isFocus) {
      refetch();
    }
  }, [query, isFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="py-3 lg:py-5 border-b">
        <div className="lg:container mx-auto flex items-center justify-between gap-x-6 px-4">
          <div className="flex items-center gap-6">
            <Link
              href={'/'}
              className="w-[90px] sm:w-[110px] md:w-[136px] lg:w-[156px] xl:w-[176px] h-10 sm:h-14 relative"
            >
              <Image
                defaultSrc="/header_logo.png"
                isLocal
                fill
                alt="logo"
                className="object-fit"
              />
            </Link>
            <div className="py-1 px-2 items-center gap-x-3 hidden lg:flex">
              <Link
                target="_blank"
                href={
                  'https://wa.me/+971066265479?text=Hello%20there!'
                  // 'https://web.whatsapp.com/send?phone=+8801965921314&text=Hello%20there!'
                }
              >
                <RiWhatsappFill className="text-[28px] text-[#1FAF38]" />
              </Link>
              <div className="">
                <p className="text-xs text-neutral-800 font-light">Whatsapp</p>
                <p className="text-sm text-neutral-800 font-semibold">Chat</p>
              </div>
            </div>
          </div>
          {showSearch && path === '/' && (
            <div className="hidden md:block flex-1 relative">
              <div className="relative">
                <Input
                  ref={inputRef}
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  name={'search'}
                  type="search"
                  onClick={() => setFocus(true)}
                  placeholder="Search your favorite product .."
                  className="rounded-lg bg-neutral-50 h-10 sm:h-11 w-full focus-visible:outline-none border border-neutral-100 focus-visible:border-gray-300 pr-3.5 pl-10 py-2 sm:py-2.5 text-[#667085]"
                />
                <button
                  type="button"
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
                >
                  <FiSearch className="text-lg lg:text-xl" />
                </button>
              </div>
              {isFocus && query && (
                <div
                  ref={modalRef}
                  className="absolute top-12 shadow-xl left-0 z-50 border-t border-gray-50 bg-white rounded-2xl w-full min-h-[400px] p-4 2xl:p-6"
                >
                  {isSearchLoading ? (
                    <>
                      <div className="grid grid-cols-8 gap-4">
                        {Array(8)
                          .fill(' ')
                          .map((_, i) => (
                            <div key={`l_${i}`} className="">
                              <div className=" size-24 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                          ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {Array(6)
                          .fill(' ')
                          .map((_, i) => (
                            <div key={`l_${i}`} className="">
                              <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                          ))}
                      </div>
                    </>
                  ) : !data?.category.length && !data?.product.length ? (
                    <div className="">
                      <p className="text-lg">
                        Noting found for{' '}
                        <span className="text-primary">
                          &quot;{query}&quot;
                        </span>
                      </p>
                    </div>
                  ) : (
                    <>
                      {data?.category.length! > 0 && (
                        <>
                          <h4 className="text-gray-700 text-xl font-semibold">
                            Categories
                          </h4>
                          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 px-2 2xl:px-4">
                            {data?.category?.map((cat, i) => (
                              <SearchCatCard key={`cat_${i}`} cat={cat} />
                            ))}
                          </div>
                        </>
                      )}
                      {data?.product.length! > 0 && (
                        <>
                          <h4 className="text-gray-700 text-xl font-semibold mt-5">
                            Products
                          </h4>
                          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 2xl:gap-4 px-2 2xl:px-4">
                            {data?.product?.map((pd, i) => (
                              <SearchPrdCard key={`pd_${i}`} pd={pd} />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
          <button className=" md:hidden" onClick={() => setIsOpen(true)}>
            <FaBars className="text-xl sm:text-2xl text-green" />
          </button>
          {isLoading ? (
            <div className="hidden md:flex items-center gap-x-2 md:gap-x-4">
              <div className="hidden md:flex items-center gap-x-3 p-2">
                <div
                  key={1}
                  className="w-10 h-10 bg-gray-200 rounded animate-pulse"
                />
                <div
                  key={2}
                  className="w-20 h-10 bg-gray-200 rounded animate-pulse"
                />
              </div>
              <div className="hidden md:flex items-center gap-x-3 p-2">
                <div
                  key={1}
                  className="w-10 h-10 bg-gray-200 rounded animate-pulse"
                />
                <div
                  key={2}
                  className="w-20 h-10 bg-gray-200 rounded animate-pulse"
                />
              </div>
            </div>
          ) : isLoggedIn ? (
            <div className="hidden md:flex items-center gap-x-2 md:gap-x-4">
              <div className="hidden md:flex items-center gap-x-3 p-2">
                <Link href={'/dashboard/profile'}>
                  <FiUser className="text-2xl xl:text-[28px] text-green" />
                </Link>
                <div className="text-green hidden md:block">
                  <p className="text-tiny lg:text-xs">
                    Hi,{' '}
                    <span className=" capitalize">{profile?.first_name}</span>
                  </p>
                  <Link
                    href={'/dashboard/profile'}
                    className="flex items-center gap-x-1"
                  >
                    <p className="text-xs lg:text-sm font-medium xl:font-semibold">
                      My Account
                    </p>
                    <IoIosArrowDown className="xl:text-lg" />
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-x-3 p-2">
                <FiShoppingBag className="text-2xl xl:text-[26px] text-green" />
                <div className="text-green hidden md:block">
                  <p className="text-tiny lg:text-xs">My Cart</p>
                  <Link
                    href={'/dashboard/cart'}
                    className="flex items-center gap-x-1"
                  >
                    <p className="text-xs lg:text-sm font-medium xl:font-semibold uppercase">
                      {profile?.cart_count}
                      {/* AED */}
                    </p>
                    <IoIosArrowDown className="xl:text-lg" />
                  </Link>
                </div>
              </div>
              <Link
                href={'/dashboard/wishlist'}
                className="hidden md:flex items-center gap-x-3 p-2"
              >
                <FaRegHeart className="text-2xl xl:text-[26px] text-green" />
                <div className="text-green hidden md:block">
                  <p className="text-tiny lg:text-xs">My Wislist</p>
                  <IoIosArrowDown className="xl:text-lg" />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-4">
              <Link href={'/auth/sign-in'} className="ml-4 hidden lg:inline">
                <RiUserSharedLine className="text-2xl lg:text-[28px] text-green" />
              </Link>
              <Link
                href={'/cart'}
                className="flex items-center gap-x-1 relative"
              >
                <p className="text-xs lg:text-sm font-medium xl:font-semibold uppercase absolute -top-1.5 -right-1.5 bg-green text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {profile?.cart_count}
                  {/* AED */}
                </p>
                <FiShoppingBag className="text-2xl xl:text-[26px] text-green" />
              </Link>
              <Link href={'/auth/sign-in'} className="hidden lg:inline">
                <FaRegHeart className="text-2xl xl:text-[26px] text-green" />
              </Link>
            </div>
          )}
        </div>
      </header>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="left">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Link href={'/'} className="w-24 h-10 block relative">
              <Image src="/header_logo.png" fill alt="logo" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="size-6 rounded-full flex items-center justify-center bg-slate-100"
            >
              <FiPlus className="rotate-45" />
            </button>
          </div>
          <ul className="space-y-1 pt-6">
            {isLoggedIn && (
              <>
                <li className={``}>
                  <Link
                    href={'/dashboard/cart'}
                    className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 py-2 text-sm xl:text-base font-medium xl:font-semibold"
                  >
                    <FiShoppingBag className="text-lg" />
                    My Cart
                  </Link>
                </li>
                <li className={``}>
                  <Link
                    href={'/dashboard/cart'}
                    className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 py-2 text-sm xl:text-base font-medium xl:font-semibold"
                  >
                    <FaRegHeart className="text-lg" />
                    My Wislist
                  </Link>
                </li>
                <li className={``}>
                  <Link
                    href={'/dashboard/cart'}
                    className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 py-2 text-sm xl:text-base font-medium xl:font-semibold"
                  >
                    <FiUser className="text-lg" />
                    My Account
                  </Link>
                </li>
              </>
            )}
            {/* {topBarCategories.map((cat, i) => (
              <li key={`cat_${i}`}>
                <Link
                  href={'#'}
                  className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold"
                >
                  {cat.title}
                  <HiArrowNarrowRight className="text-lg mt-0.5" />
                </Link>
              </li>
            ))} */}
            <li className="">
              <Link
                href={'#'}
                className="text-green hover:text-primary/90 pt-2 pb-3 uppercase items-center gap-x-2 text-sm xl:text-base font-medium xl:font-semibold flex"
              >
                <BsBookmarkStar className="text-xl" />
                Special offer
                <HiArrowNarrowRight className="text-lg" />
              </Link>
            </li>
            {/* <li className="pb-2">
              <Link
                href={'#'}
                className="text-sm xl:text-base font-medium xl:font-semibold flex items-center gap-x-1 text-[#16A34A] hover:text-[#16A34A]/70"
              >
                Get A Quote
                <HiArrowNarrowRight className="text-lg" />
              </Link>
            </li> */}
            {!isLoggedIn && (
              <>
                <li className="pt-8">
                  <Link
                    href={'/auth/sign-in'}
                    className="text-sm xl:text-base font-medium xl:font-semibold py-2 border border-primary rounded flex items-center justify-center gap-x-1 text-primary"
                  >
                    Login
                    <HiArrowNarrowRight className="text-lg" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/auth/register'}
                    className="text-sm xl:text-base font-medium xl:font-semibold py-2 mt-3 border border-primary rounded flex items-center justify-center gap-x-1 text-primary"
                  >
                    Register
                    <HiArrowNarrowRight className="text-lg" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Header;

const SearchCatCard = ({ cat }) => {
  const [image, setImage] = useState('');
  const handleError = () => {
    setImage('/default-image.webp'); // fallback image path
  };
  return (
    <Link href={`/${cat.slug}`} className="block">
      <div className="relative h-20 2xl:h-24 overflow-hidden rounded-lg px-2">
        <Image
          src={image ?? config.imgUri + cat.image}
          fill
          className="object-cover bg-gray-200 text-sm"
          alt="category"
          onError={handleError}
        />
      </div>
      <p className="font-medium uppercase text-xs mt-2 text-center whitespace-nowrap max-w-[95px] overflow-hidden text-ellipsis">
        {cat.title}
      </p>
    </Link>
  );
};

const SearchPrdCard = ({ pd }) => {
  const [image, setImage] = useState('');
  const handleError = () => {
    setImage('/default-image.webp'); // fallback image path
  };
  return (
    <Link
      href={`/search/${pd.slug}/${pd.id}`}
      key={`cat_`}
      className="border border-gray-200 flex gap-x-4 px-3 py-2 rounded-md overflow-hidden"
    >
      <div className="relative size-10 2xl:size-14 overflow-hidden rounded-lg px-2">
        <Image
          src={image ?? config.imgUri + pd.image}
          onError={handleError}
          fill
          className="object-contain bg-gray-200 text-xs"
          alt="product"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium uppercase text-[10px] 2xl:text-xs mt-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
          {pd.title}
        </p>
        <p className="font-medium uppercase text-[10px] 2xl:text-xs mt-2">
          {pd?.offered ?? pd.selling} AED
        </p>
      </div>
    </Link>
  );
};
