import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiUserSharedLine, RiWhatsappFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import CustomInput from './common/CustomInput';

const Header = () => {
  const { control, handleSubmit } = useForm<any>();

  console.log(handleSubmit);

  return (
    <header className="py-5 border-b">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        <div className="flex items-center gap-6">
          <Link href={'/'} className="w-[176px] h-[31px] relative">
            <Image src="/logo.svg" fill alt="logo" />
          </Link>
          <div className="py-1 px-2 flex items-center gap-x-3">
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
        <div className="flex-1">
          <CustomInput
            control={control}
            wrapClassName="w-full"
            type="search"
            name={'search'}
            placeholder="Search your favorite product .."
          />
        </div>
        <Link
          href={'/auth/sign-in'}
          className="py-2 px-7 flex items-center gap-x-3 border rounded-lg"
        >
          <RiUserSharedLine className="text-[28px] text-[#1A1E5E]" />

          <div className="">
            <p className="text-xs text-[#1A1E5E] font-light">Login</p>
            <p className="text-sm text-[#1A1E5E] font-semibold">Register</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
