import { Button, InputPhoneNumber, Input } from '@/components';
import React from 'react';
import { BsPhone } from 'react-icons/bs';
import { useForm } from 'react-hook-form';

const SendOtp = ({
  onContinue,
  description,
  loading,
}: {
  onContinue?: (email: string) => void;
  description?: string;
  loading?: boolean;
}) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data: any) => {
    onContinue?.(data.email);
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
        control={control}
        rules={{
          required: 'Email Address is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        name="email"
        label="Email Address *"
        placeholder="Enter email address"
        wrapClassName="flex-1 mt-4 sm:mt-6"
        error={errors.email}
      />
      {/* <InputPhoneNumber
        label="Mobile Number"
        control={control}
        rules={{ required: 'mobile number is required' }}
        // setError={setError}
        clearErrors={clearErrors}
        name="phone"
        error={errors?.phone}
        wrapClassName="mt-8"
      /> */}
      <Button
        loading={loading}
        onClick={handleSubmit(onFormSubmit)}
        className="mt-6"
      >
        Continue
      </Button>
    </>
  );
};

export default SendOtp;
