'use client';
import { Button } from '@/components';
import React, { useState, useEffect } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import OtpInput from 'react-otp-input';
import { useSearchParams } from 'next/navigation';

const OtpVerify = ({
  onVerify,
  number,
  title,
  loading,
  onResend,
}: {
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  number?: string | number;
  title?: string;
  loading?: boolean;
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(90); // 90 seconds countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const params = useSearchParams();

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer hits 0
    }
  }, [timer]);

  const onSubmit = () => {
    if (otp.length === 4) {
      onVerify?.(otp);
    } else {
      setError(true);
    }
  };

  const handleResend = () => {
    onResend?.();
    setTimer(90); // Reset timer to 90 seconds
    setIsResendDisabled(true); // Disable resend button again
  };

  // Function to format the timer in minutes and seconds (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <BiEnvelope className="text-2xl text-[#344054]" />
        </div>
        <p className="text-sm text-neutral-500 mt-1 text-center">
          Please enter the 4-digit code sent to
        </p>
        <p className="text-sm text-neutral-500 font-bold mt-1 text-center">
          {params.get('data') ?? '+971******479'}
        </p>
      </div>

      <OtpInput
        value={otp}
        onChange={(v) => {
          setOtp(v);
          v.length > 3 && setError(false);
        }}
        numInputs={4}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '32px',
          maxWidth: '294px',
          marginInline: 'auto',
          gap: '0 10px',
        }}
        inputStyle={{
          width: '56px',
          height: '70px',
          border: `1px solid ${!error ? '#D1D5DB' : '#FECDCA'}`,
          borderRadius: '5px',
        }}
      />
      {error && (
        <p className={'text-error mt-3 text-xs'}>Please fill all inputs</p>
      )}
      <p className="text-sm text-neutral-500 mt-4 text-center">
        Didn&apos;t receive the code?{' '}
        <button
          onClick={handleResend}
          type={'button'}
          className="font-semibold text-primary"
          disabled={isResendDisabled}
        >
          {isResendDisabled
            ? `Resend code in ${formatTime(timer)}`
            : 'Resend code'}
        </button>
      </p>
      <Button loading={loading} onClick={onSubmit} className="mt-6">
        {title ?? 'Continue'}
      </Button>
    </>
  );
};

export default OtpVerify;
