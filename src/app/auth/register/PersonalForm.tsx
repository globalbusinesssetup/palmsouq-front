'use client';
import { Input, Button } from '@/components';
import React from 'react';
import { FieldError, useForm } from 'react-hook-form';

const PersonalForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<any>({ mode: 'onChange' });
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
          error={errors.first_name}
        />
        <Input
          control={control}
          rules={{ required: 'Last Name is required' }}
          name="last_name"
          label="Last Name *"
          placeholder="Enter last name"
          wrapClassName="flex-1 mt-4 sm:mt-0"
          error={errors.last_name}
        />
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
      <div className="sm:flex flex-row items-center gap-4 mt-6">
        <Input
          control={control}
          rules={{
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                'Password must be 8+ chars with uppercase, lowercase, and number',
            },
          }}
          name="password"
          error={errors.password}
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
              value === formValues.password || 'Passwords do not match',
          }}
          name="cnfm_password"
          label="Confirm Password *"
          type="password"
          placeholder="••••••••"
          wrapClassName="flex-1 mt-4 sm:mt-0"
          error={errors.cnfm_password}
        />
      </div>
      <p
        className={`text-error text-xs min-h-4 ${
          errors.password ? 'invisible sm:visible' : 'invisible'
        }`}
      >
        {(errors.password as FieldError)?.message || ''}
      </p>
      <Button type={'submit'} className="mt-4">
        Register
      </Button>
    </form>
  );
};

export default PersonalForm;
