import { Button } from '@/components';
import React, { useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import OtpInput from 'react-otp-input';
import { useSearchParams } from 'next/navigation';

const OtpVerify = ({
  onVerify,
  number,
  title,
  loading,
}: {
  onVerify?: (otp: string) => void;
  number?: string | number;
  title?: string;
  loading?: boolean;
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const params = useSearchParams();

  const onSubmit = () => {
    if (otp.length === 4) {
      onVerify?.(otp);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <BiEnvelope className="text-2xl text-[#344054]" />
        </div>
        <p className="text-sm text-neutral-500 mt-1 text-center">
          Please enter 4 digit code sent to
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
        <p className={'text-error mt-3 text-xs'}>please fill all input</p>
      )}
      <p className="text-sm text-neutral-500 mt-4 text-center">
        Didn&apos;t receive the code?{' '}
        <button type={'button'} className="font-semibold text-primary">
          Resent code
        </button>
      </p>
      <Button loading={loading} onClick={onSubmit} className="mt-6">
        {title ?? 'Continue'}
      </Button>
    </>
  );
};

export default OtpVerify;
