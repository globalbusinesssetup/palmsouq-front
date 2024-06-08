'use client';
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { OtpVerify, SendOtp } from '@/components';

// export const metadata: Metadata = {
//   title: 'Sign In | Printcraft',
// };

const SignIn = () => {
  const router = useRouter();
  const [flow, setFlow] = useState('sign-in');

  return (
    <main className="bg-white h-screen flex items-center justify-center">
      <div>
        <div className="w-[400px] border border-[#D0D5DD] rounded-xl shadow-md p-6">
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
