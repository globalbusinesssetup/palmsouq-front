'use client';
import React, { useEffect, useState } from 'react';
import SignInForm from './SignInForm';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { OtpVerify, SendOtp } from '@/components';
import useAuth from '@/hooks/useAuth';

const SignIn = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  });
  const [flow, setFlow] = useState('sign-in');

  return (
    <main className="bg-white min-h-[calc(100vh-97px)] flex items-center justify-center px-4 py-5">
      <div>
        <div className="sm:w-[400px] border border-[#D0D5DD] rounded-xl shadow-md p-5 sm:p-6 my-6">
          {flow === 'sign-in' ? (
            <SignInForm onSignIn={() => setFlow('send-otp')} />
          ) : flow === 'send-otp' ? (
            <SendOtp onContinue={() => setFlow('otp')} />
          ) : (
            <OtpVerify onVerify={() => router.push('/')} />
          )}
        </div>
        {flow !== 'sign-in' && (
          <button
            onClick={() => setFlow('sign-in')}
            className="mt-6 text-base font-semibold text-neutral-600 hover:text-neutral-400 duration-200 w-full text-center inline-flex items-center justify-center gap-2"
          >
            <FaArrowLeftLong /> Back to sign in
          </button>
        )}
      </div>
    </main>
  );
};

export default SignIn;
