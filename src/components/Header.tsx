'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiUserSharedLine, RiWhatsappFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import CustomInput from './common/CustomInput';
import { IoIosArrowDown } from 'react-icons/io';
import { FiPlus, FiShoppingBag, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { topBarCategories } from '@/constants';
import { CloseButton } from '@headlessui/react';
import { FaBars } from 'react-icons/fa6';
import useAuth from '@/hooks/useAuth';

const Header = ({
  showSearch = false,
  onChange,
}: {
  showSearch?: boolean;
  onChange?: (val: any) => void;
}) => {
  const router = useRouter();
  const { control } = useForm<any>();
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <header className="py-3 sm:py-4 md:py-5 border-b">
        <div className="container mx-auto flex items-center justify-between gap-x-6 px-4">
          <div className="flex items-center gap-6">
            <Link
              href={'/'}
              className="w-[90px] sm:w-[110px] md:w-[136px] lg:w-[156px] xl:w-[176px] h-7 sm:h-[31px] relative"
            >
              <Image src="/logo.svg" fill alt="logo" />
            </Link>
            <div className="py-1 px-2 items-center gap-x-3 hidden lg:flex">
              <Link href={'#'}>
                <RiWhatsappFill className="text-[28px] text-[#1FAF38]" />
              </Link>
              <div className="">
                <p className="text-xs text-neutral-800 font-light">Whatsapp</p>
                <p className="text-sm text-neutral-800 font-semibold">
                  Instant Quote
                </p>
              </div>
            </div>
          </div>
          {showSearch && (
            <div className="hidden md:block flex-1">
              <CustomInput
                control={control}
                onChange={onChange}
                wrapClassName="w-full"
                type="search"
                name={'search'}
                placeholder="Search your favorite product .."
              />
            </div>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <button className=" md:hidden" onClick={() => setIsOpen(true)}>
                <FaBars className="text-xl sm:text-2xl text-[#1A1E5E]" />
              </button>
              <div className="hidden md:flex items-center gap-x-3 p-2">
                <Link href={'/dashboard/profile'}>
                  <FiUser className="text-2xl xl:text-[28px] text-[#1A1E5E]" />
                </Link>
                <div className="text-[#1A1E5E] hidden md:block">
                  <p className="text-tiny lg:text-xs">Hi, Yallprints</p>
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
                <FiShoppingBag className="text-2xl xl:text-[26px] text-[#1A1E5E]" />
                <div className="text-[#1A1E5E] hidden md:block">
                  <p className="text-tiny lg:text-xs">My Cart</p>
                  <Link
                    href={'/dashboard/cart'}
                    className="flex items-center gap-x-1"
                  >
                    <p className="text-xs lg:text-sm font-medium xl:font-semibold uppercase">
                      0.00 AED
                    </p>
                    <IoIosArrowDown className="xl:text-lg" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href={'/auth/sign-in'}
              className="py-2 px-3 md:px-7 flex items-center gap-x-3 md:border rounded-lg"
            >
              <RiUserSharedLine className="text-2xl lg:text-[28px] text-[#1A1E5E]" />

              <div className="hidden md:block">
                <p className="text-xs text-[#1A1E5E] font-light">Login</p>
                <p className="text-sm text-[#1A1E5E] font-semibold">Register</p>
              </div>
            </Link>
          )}
        </div>
      </header>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="left">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Link href={'/'} className="w-24 h-8 block relative">
              <Image src="/logo.svg" fill alt="logo" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="size-6 rounded-full flex items-center justify-center bg-slate-100"
            >
              <FiPlus className="rotate-45" />
            </button>
          </div>
          <ul className="space-y-3 mt-4">
            <li>
              <Link
                href={'/dashboard/cart'}
                className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold"
              >
                <FiShoppingBag className="text-lg" />
                My Cart
              </Link>
            </li>
            <li className="pb-2">
              <Link
                href={'/dashboard/cart'}
                className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold"
              >
                <FiUser className="text-lg" />
                My Account
              </Link>
            </li>
            {topBarCategories.map((cat, i) => (
              <li key={`cat_${i}`}>
                <Link
                  href={'#'}
                  className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold"
                >
                  {cat.title}
                  <HiArrowNarrowRight className="text-lg mt-0.5" />
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={'#'}
                className="text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold block"
              >
                New Arrival
              </Link>
            </li>
            <li className="pb-2">
              <Link
                href={'#'}
                className="text-sm xl:text-base font-medium xl:font-semibold flex items-center gap-x-1 text-[#16A34A] hover:text-[#16A34A]/70"
              >
                Get A Quote
                <HiArrowNarrowRight className="text-lg" />
              </Link>
            </li>
            <li>
              <Link
                href={'/auth/sign-in'}
                className="text-sm xl:text-base font-medium xl:font-semibold flex items-center gap-x-1 text-primary"
              >
                Login
                <HiArrowNarrowRight className="text-lg" />
              </Link>
            </li>
            <li>
              <Link
                href={'/auth/register'}
                className="text-sm xl:text-base font-medium xl:font-semibold flex items-center gap-x-1 text-primary"
              >
                Register
                <HiArrowNarrowRight className="text-lg" />
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
