'use client';
import { OtpVerify, SendOtp } from '@/components';
import React, { useState } from 'react';
import NewPasswordForm from './NewPasswordForm';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

type flow = 'number' | 'otp' | 'password';

const ForgotPassword = () => {
  const router = useRouter();
  const [currentFlow, setFlow] = useState<flow>('number');

  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-5">
      <div className="py-10">
        <div className="sm:w-[400px] border border-[#D0D5DD] rounded-xl shadow-md p-6">
          {currentFlow === 'number' ? (
            <SendOtp onContinue={() => setFlow('otp')} />
          ) : currentFlow === 'otp' ? (
            <OtpVerify onVerify={() => setFlow('password')} />
          ) : (
            <NewPasswordForm onUpdate={() => router.push('/auth/sign-in')} />
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
