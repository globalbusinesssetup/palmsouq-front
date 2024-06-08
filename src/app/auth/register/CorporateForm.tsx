'use client';
import { Input, Button, CheckBox } from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiUpload } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

// export const metadata: Metadata = {
//   title: 'Sign In | Printcraft',
// };

const CorporateForm = () => {
  const { control, handleSubmit } = useForm<any>();

  const onRegister = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onRegister)} className="mt-8">
      <div className="sm:flex flex-row items-center gap-4">
        <Input
          control={control}
          rules={{ required: 'First Name is required' }}
          name="first_name"
          label="First Name *"
          placeholder="Enter first name"
          wrapClassName="flex-1 mt-4 sm:mt-0"
        />
        <Input
          control={control}
          rules={{ required: 'Last Name is required' }}
          name="last_name"
          label="Last Name *"
          placeholder="Enter last name"
          wrapClassName="flex-1 mt-4 sm:mt-0"
        />
      </div>
      <Input
        control={control}
        rules={{ required: 'Company Name is required' }}
        name="company"
        label="Company Name *"
        placeholder="Enter your company name"
        wrapClassName="flex-1 mt-4 sm:mt-6"
      />
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
      />
      <div className="sm:flex flex-row items-center gap-4 mt-6">
        <Input
          control={control}
          rules={{
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number',
            },
          }}
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          wrapClassName="flex-1 mt-4 sm:mt-0"
        />
        <Input
          control={control}
          rules={{
            required: 'Confirm Password is required',
            validate: (value: string, formValues: any) =>
              value === formValues.password,
          }}
          name="cnfm_password"
          label="Confirm Password *"
          type="password"
          placeholder="••••••••"
          wrapClassName="flex-1 mt-4 sm:mt-0"
        />
      </div>
      <div className="flex items-center gap-6 mt-8">
        <Input
          control={control}
          rules={{ required: 'Trade License is required' }}
          label="Trade License *"
          name="trade_license"
          type="file"
          wrapClassName="flex-1"
        />
        <Input
          control={control}
          rules={{ required: 'TRN Certificate is required' }}
          label="TRN Certificate *"
          name="trn_certificate"
          type="file"
          wrapClassName="flex-1"
        />
      </div>
      <Button type="submit" className="mt-8">
        Register
      </Button>
    </form>
  );
};

export default CorporateForm;
