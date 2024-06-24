'use client';
import { Button, Input } from '@/components';
import React from 'react';
import { useForm } from 'react-hook-form';

const Password = () => {
  const { control, handleSubmit, reset } = useForm();

  const onPasswordChange = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onPasswordChange)}
      className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 border border-neutral-200 rounded-xl bg-white"
    >
      <h4 className="text-lg text-neutral-900 font-semibold">
        Change password
      </h4>
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <Input
          control={control}
          rules={{
            required: 'Password is required',
          }}
          type="password"
          name="password"
          wrapClassName="w-full"
          label="Current password"
          placeholder="Current password"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-x-4 mt-1">
          <Input
            control={control}
            rules={{
              required: 'New password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  'Password must be 8+ chars with uppercase, lowercase, and number',
              },
            }}
            type="password"
            name="new_password"
            wrapClassName="w-full"
            label="New password"
            placeholder="New password"
          />
          <Input
            control={control}
            rules={{
              required: 'Confirm password is required',
              validate: (value: string, formValues: any) =>
                value === formValues.password || 'Passwords do not match',
            }}
            type="password"
            name="cnfm_password"
            wrapClassName="w-full"
            label="Confirm password"
            placeholder="Confirm password"
          />
        </div>
      </div>
      <div className="md:flex justify-end mt-4">
        <Button type="submit" className="md:w-[155px] text-sm">
          Change password
        </Button>
      </div>
    </form>
  );
};

export default Password;
