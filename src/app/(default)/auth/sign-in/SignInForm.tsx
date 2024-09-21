'use client';
import {
  Input,
  InputPhoneNumber,
  Button,
  CheckBox,
  OtpVerify,
  Modal,
} from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdLogIn } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Sign In | Printcraft',
// };

const SignInForm = ({ onSignIn }: { onSignIn?: () => void }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm();
  const { login } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [phone, setPhone] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);

  const onFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await login(data);
      if (res.isSuccess) {
        setPhoneModalOpen(true);
        reset();
      }
      console.log(res?.isSuccess);
    } catch (err) {
      console.log('Err Login ==>', err);
    }
    setLoading(false);
    // onSignIn?.();
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
        {/* <Input
          control={control}
          rules={{
            required: 'Email Address is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          name="email"
          label="Email Address *"
          placeholder="Enter email address"
          wrapClassName="flex-1 mt-4 sm:mt-6"
          error={errors.email}
        /> */}
        <InputPhoneNumber
          label="Mobile Number"
          control={control}
          rules={{ required: 'mobile number is required' }}
          // setError={setError}
          clearErrors={clearErrors}
          name="phone"
          error={errors?.phone}
          wrapClassName="mt-8"
        />
        <Input
          control={control}
          rules={{ required: 'password is required' }}
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          wrapClassName="mt-4"
          error={errors?.password}
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
          <Button
            loading={isLoading}
            type="submit"
          >
            Sign in
          </Button>
          <div className="flex items-center gap-x-3 py-2">
            <div className="flex-1 h-[1px] bg-gray-700" />
            <p className="uppercase">or</p>
            <div className="flex-1 h-[1px] bg-gray-700" />
          </div>
          <Button
            outlined
            disabled={isLoading}
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/social-login/redirect/google`
              )
            }
            type="button"
            className="mt-1 flex items-center justify-center gap-x-2"
          >
            <FcGoogle size={18} />
            Log in with google
          </Button>
          <Link
            href={'/auth/register'}
            className="mt-3 text-base font-semibold text-neutral-600 hover:text-neutral-400 duration-200 w-full text-center inline-flex items-center justify-center gap-2"
          >
            Register here
            <FaArrowRightLong />
          </Link>
        </div>
      </form>
      <Modal
        show={isPhoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        panelClassName={'w-[400px] p-6 lg:p-8'}
      >
        <OtpVerify
          title="Verify"
          onVerify={() => {
            setPhoneModalOpen(false);
            // setOtpSent(false);
          }}
        />
      </Modal>
    </>
  );
};

export default SignInForm;
