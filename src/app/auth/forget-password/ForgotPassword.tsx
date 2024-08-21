'use client';
import { OtpVerify, SendOtp } from '@/components';
import React, { useEffect, useState } from 'react';
import NewPasswordForm from './NewPasswordForm';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/utils/fetcher';

type flow = 'number' | 'otp' | 'password';

const ForgotPassword = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [currentFlow, setFlow] = useState<flow | string>('number');
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const onSend = async (email: any) => {
    setLoading(true);
    try {
      const res = await api.post('/user/forgot-password', {
        email: email,
      });
      if (res.data?.data?.form) {
        toast.error(res.data?.data?.form?.[0]);
      } else {
        setFlow('otp');
        router.push(
          `/auth/forget-password/?data=${res.data.data}&currentFlow=otp`
        );
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const onSubmit = async (password: string) => {
    setLoading(true);
    try {
      const res = await api.post('/user/update-password', {
        email: params.get('data'),
        code: otp ?? params.get('otp'),
        password: password,
      });
      if (res.data?.data?.form) {
        toast.error(res.data?.data?.form?.[0]);
      } else {
        router.push('/auth/sign-in');
        toast.success('Password changed Successfully!');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params.get('currentFlow')) {
      setFlow(params.get('currentFlow') ?? 'number');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-5">
      <div className="py-10">
        <div className="sm:w-[400px] border border-[#D0D5DD] rounded-xl shadow-md p-6 overflow-hidden">
          {currentFlow === 'number' ? (
            <SendOtp
              loading={isLoading}
              onContinue={(email) => onSend(email)}
            />
          ) : currentFlow === 'otp' ? (
            <OtpVerify
              onVerify={(otp) => {
                setOtp(otp);
                setFlow('password');
                router.push(
                  `/auth/forget-password/?data=${params.get(
                    'data'
                  )}&otp=${otp}&currentFlow=password`
                );
              }}
            />
          ) : (
            <NewPasswordForm
              loading={isLoading}
              onUpdate={(password) => onSubmit(password)}
            />
          )}
        </div>
        <Link
          href={'/auth/sign-in'}
          className="mt-6 text-base font-semibold text-neutral-500 hover:text-neutral-400 duration-200 w-full text-center inline-flex items-center justify-center gap-2"
        >
          <FaArrowLeftLong /> Back to sign in
        </Link>
      </div>
    </main>
  );
};

export default ForgotPassword;
