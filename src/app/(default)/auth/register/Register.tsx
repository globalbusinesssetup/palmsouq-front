import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoMdLogIn } from 'react-icons/io';
import PersonalForm from './PersonalForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { OtpVerify } from '@/components';
import { api } from '@/utils/fetcher';
import { toast } from 'react-toastify';

const Register = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleVerify = async (otp: string) => {
    setLoading(true);
    try {
      const res = await api.post('/user/verify', {
        code: otp,
        email: params.get('data'),
      });
      if (res.data?.data?.form) {
        toast.error(res.data?.data?.form?.[0]);
      } else {
        toast.success('Email verified Successfully!');
        router.push(`/auth/sign-in`);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <main className="bg-white sm:flex items-center justify-center px-4 sm:px-5 min-h-screen">
      {!params.get('data') ? (
        <div className="py-10">
          <div className="sm:w-[567px] border border-[#D0D5DD] rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
                <IoMdLogIn className="text-2xl text-[#344054]" />
              </div>
              <div className="text-center">
                <h4 className="text-xl sm:text-2xl font-semibold text-neutral-700">
                  Registration
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Register now and join YallaPrints today!
                </p>
              </div>
            </div>
            <PersonalForm />
            <>
              <p className="text-xs text-center mt-3 text-neutral-700">
                By creating an account you agree to our{' '}
                <Link
                  href={'#'}
                  className="text-[#312ECB] hover:text-[#312ECB]/70 duration-200 transition-all"
                >
                  Terms of service
                </Link>{' '}
                and{' '}
                <Link
                  href={'#'}
                  className="text-[#312ECB] hover:text-[#312ECB]/70 duration-200 transition-all"
                >
                  Privacy policy
                </Link>
              </p>
            </>
          </div>
          <Link
            href={'/auth/sign-in'}
            className="mt-6 text-base font-semibold text-neutral-600 hover:text-neutral-400 duration-200 w-full text-center inline-flex items-center justify-center gap-2"
          >
            <FaArrowLeftLong /> Back to sign in
          </Link>
        </div>
      ) : (
        <div className="sm:w-[400px] border border-[#D0D5DD] rounded-xl shadow-md p-5 sm:p-6 my-auto">
          <OtpVerify
            loading={isLoading}
            onVerify={(otp) => handleVerify(otp)}
          />
        </div>
      )}
    </main>
  );
};

export default Register;
