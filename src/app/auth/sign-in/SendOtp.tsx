import { Button, Input } from '@/components';
import React from 'react';
import { BsPhone } from 'react-icons/bs';

const SendOtp = ({ onContinue }: { onContinue?: () => void }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <BsPhone className="text-2xl text-[#344054]" />
        </div>
        <p className="text-sm text-neutral-500 mt-1 text-center">
          Please enter your mobile number for your new yallaprints account.
        </p>
      </div>
      <Input
        label="Mobile Number"
        name="phone"
        type="phone"
        // placeholder="••••••••"
        wrapClassName="mt-8"
      />
      <Button onClick={onContinue} className="mt-6">
        Continue
      </Button>
    </>
  );
};

export default SendOtp;
