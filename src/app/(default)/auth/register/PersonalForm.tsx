'use client';
import { Input, Button } from '@/components';
import { api } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const PersonalForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<any>({ mode: 'onChange' });
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onRegister = async (data: any) => {
    setLoading(true);
    delete data.cnfm_password;
    try {
      const res = await api.post('/user/signup', {
        ...data,
        name: `${data?.first_name} ${data?.last_name}`,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
        setLoading(false);
        return;
      }
      reset();
      router.push(`/auth/register/?data=${res.data.data}`);
      toast.success('Account has been created successfully!');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
    setLoading(false);
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
      <div className="sm:flex flex-row items-center gap-4 mt-4 sm:mt-6">
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
          wrapClassName="flex-1"
          error={errors.email}
        />
        <Input
          control={control}
          rules={{ required: 'Phone is required' }}
          name="phone"
          label="Phone *"
          placeholder="Enter Phone number"
          wrapClassName="flex-1"
          error={errors.phone}
        />
      </div>
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
      <Button loading={isLoading} type={'submit'} className="mt-4">
        Register
      </Button>
      <div className="flex items-center gap-x-3 py-2">
        <div className="flex-1 h-[1px] bg-gray-700" />
        <p className="uppercase">or</p>
        <div className="flex-1 h-[1px] bg-gray-700" />
      </div>
      <Button
        outlined
        disabled={isLoading}
        onClick={() =>
          router.push(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/social-login/redirect/google`
          )
        }
        type="button"
        className="mt-1 flex items-center justify-center gap-x-2"
      >
        <FcGoogle size={18} />
        Log in with google
      </Button>
    </form>
  );
};

export default PersonalForm;
