import { Button, Input } from '@/components';
import React from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useForm } from 'react-hook-form';

const NewPasswordForm = ({
  onUpdate,
  loading = false,
}: {
  onUpdate?: (password: string) => void;
  loading?: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onFormSubmit = (data: any) => {
    console.log(data);
    onUpdate?.(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <HiOutlineLockClosed className="text-2xl text-[#344054]" />
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold text-neutral-700">
            Set new password
          </h4>
          <p className="text-sm text-neutral-500 mt-1">
            Your new password must be different
          </p>
        </div>
      </div>
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
        error={errors?.password}
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        wrapClassName="mt-4 w-full"
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
        error={errors?.cnfm_password}
        type="password"
        placeholder="••••••••"
        wrapClassName="mt-4 w-full"
      />
      <Button loading={loading} type={'submit'} className="mt-6">
        Update password
      </Button>
    </form>
  );
};

export default NewPasswordForm;
