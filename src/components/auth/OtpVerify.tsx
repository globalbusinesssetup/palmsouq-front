import { Button } from '@/components';
import React, { useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import OtpInput from 'react-otp-input';

const OtpVerify = ({ onVerify }: { onVerify?: () => void }) => {
  const [otp, setOtp] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
    if (otp.length === 4) {
      onVerify();
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
          +971******479
        </p>
      </div>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '32px',
          paddingInline: '28px',
        }}
        inputStyle={{
          width: '56px',
          height: '70px',
          border: '1px solid #D1D5DB',
          borderRadius: '5px',
        }}
      />
      <p className="text-sm text-neutral-500 mt-4 text-center">
        Didn’t receive the code?{' '}
        <button type={'button'} className="font-semibold text-primary">
          Resent code
        </button>
      </p>
      <Button onClick={onSubmit} className="mt-6">
        Continue
      </Button>
    </>
  );
};

export default OtpVerify;
