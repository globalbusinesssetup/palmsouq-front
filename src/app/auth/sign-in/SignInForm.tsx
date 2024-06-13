'use client';
import { Input, InputPhoneNumber, Button, CheckBox } from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdLogIn } from 'react-icons/io';
import { useForm } from 'react-hook-form';

// export const metadata: Metadata = {
//   title: 'Sign In | Printcraft',
// };

const SignInForm = ({ onSignIn }: { onSignIn?: () => void }) => {
  const { control, handleSubmit, setValue, setError, clearErrors } = useForm();
  const [enabled, setEnabled] = useState(false);
  const [phone, setPhone] = useState<any>();

  const onFormSubmit = (data: any) => {
    console.log(data);
    onSignIn?.();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <IoMdLogIn className="text-2xl text-[#344054]" />
        </div>
        <div className="text-center">
          <h4 className="text-2xl font-semibold text-neutral-700">Welcome</h4>
          <p className="text-sm text-neutral-500 mt-1">
            Sign in to Unlock Exclusive Features
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="mt-8">
        <InputPhoneNumber
          control={control}
          label="Mobile Number"
          name="phone"
          rules={{ required: 'mobile number is required' }}
          // setError={setError}
          clearErrors={clearErrors}
          onChange={(val: any) => setPhone(val)}
        />
        <Input
          control={control}
          rules={{ required: 'password is required' }}
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          wrapClassName="mt-4"
        />
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckBox checked={enabled} onChange={setEnabled} />
            <label
              htmlFor="remeber"
              onClick={() => setEnabled((prev) => !prev)}
              className="text-sm font-medium text-[#344054] select-none"
            >
              Remember me
            </label>
          </div>
          <Link
            href={'/auth/forget-password'}
            className="text-sm font-medium text-[#9A54FC] hover:text-[#9A54FC]/60 duration-200 select-none"
          >
            Forgot Password
          </Link>
        </div>
        <div className="mt-8">
          <Button type="submit">Sign in</Button>
          <Link
            href={'/auth/register'}
            className="mt-3 text-base font-semibold text-neutral-600 hover:text-neutral-400 duration-200 w-full text-center inline-flex items-center justify-center gap-2"
          >
            Register here
            <FaArrowRightLong />
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
