import { Button, Input } from '@/components';
import React from 'react';
import { BsPhone } from 'react-icons/bs';
import { useForm } from 'react-hook-form';

const SendOtp = ({
  onContinue,
  description,
}: {
  onContinue?: () => void;
  description?: string;
}) => {
  const { control, handleSubmit, setError, clearErrors } = useForm();

  const onFormSubmit = (data: any) => {
    onContinue?.();
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <BsPhone className="text-2xl text-[#344054]" />
        </div>
        <p className="text-sm text-neutral-500 mt-1 text-center">
          {description ??
            `Please enter your mobile number for your new yallaprints account.`}
        </p>
      </div>
      <Input
        label="Mobile Number"
        control={control}
        rules={{ required: 'mobile number is required' }}
        setError={setError}
        clearErrors={clearErrors}
        name="phone"
        type="phone"
        // placeholder="••••••••"
        wrapClassName="mt-8"
      />
      <Button onClick={handleSubmit(onFormSubmit)} className="mt-6">
        Continue
      </Button>
    </>
  );
};

export default SendOtp;
