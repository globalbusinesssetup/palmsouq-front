'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { avatar } from '../LeftBar';
import { useForm } from 'react-hook-form';
import {
  Input,
  InputPhoneNumber,
  Modal,
  SendOtp,
  OtpVerify,
  Button,
} from '@/components';
import { BiEnvelope } from 'react-icons/bi';

type FormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const Profile = () => {
  const { control, handleSubmit, setError, clearErrors } = useForm<FormInputs>({
    defaultValues: {
      firstName: 'Sadequl',
      lastName: 'Islam',
      phone: '259387439',
      email: 'example@gmail.com',
    },
  });
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    reset,
    watch,
    formState: { errors, isDirty: isEmailFormDirty },
  } = useForm<{ new_email: string }>();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);

  const handleUpload = (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const sentOtp = () => {
    setOtpSent(true);
    reset();
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 pt-6 pb-10 bg-white border border-neutral-200 rounded-xl">
      <h5 className="text-lg font-semibold text-neutral-900">Profile</h5>
      <div className="mt-3 flex items-end gap-x-4 lg:gap-x-[18px]">
        <div className="">
          <p className="text-center text-xs font-semibold text-neutral-700">
            Picture
          </p>
          <div className="mt-2.5 size-10 sm:size-14 lg:size-20 rounded-full overflow-hidden relative">
            <Image src={preview ?? avatar} fill alt="user avatar" />
          </div>
        </div>
        <div className="border border-neutral-200 rounded-lg overflow-hidden mb-1 sm:mb-2.5 lg:mb-3.5 text-xs md:text-sm lg:text-base">
          <button
            onClick={() => uploadRef.current?.click()}
            className="w-16 lg:w-20 h-8 lg:h-10 text-[#344054] transition-all duration-300 hover:bg-neutral-100 hover:scale-95 border-r"
          >
            Upload
          </button>
          <button
            onClick={() => {
              setPreview(null);
              setFile(undefined);
            }}
            className="w-16 lg:w-20 h-8 lg:h-10 text-[#344054] transition-all duration-300 hover:bg-neutral-100 hover:scale-95"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h5 className="text-lg font-semibold text-neutral-900">Account</h5>
        <button className="w-[124px] h-[43px] bg-neutral-100 transition-all duration-300 rounded-lg overflow-hidden text-sm text-neutral-600 font-semibold mt-4">
          Personal
        </button>
      </div>
      <div className="mt-10 max-w-[820px]">
        <h5 className="text-lg font-semibold text-neutral-900">
          Personal Information
        </h5>
        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-x-4 max-w-[720px]">
          <Input
            control={control}
            name="firstName"
            disabled
            label="First name"
            wrapClassName="flex-1"
          />
          <Input
            control={control}
            name="lastName"
            disabled
            label="Last name"
            wrapClassName="flex-1"
          />
        </div>
        <div className="flex items-center gap-x-1.5 mt-3 lg:mt-7">
          <InputPhoneNumber
            disabled
            control={control}
            defaultValue={25493854}
            name="phone"
            label="Mobile number"
            // setError={setError}
            clearErrors={clearErrors}
            wrapClassName="flex-1"
          />
          <button
            onClick={() => setPhoneModalOpen(true)}
            className="h-11 w-16 md:w-[94px] text-primary hover:text-primary/80 text-xs sm:text-sm font-semibold mt-0.5"
          >
            Change
          </button>
        </div>
        <div className="flex items-center gap-x-1.5 mt-3 lg:mt-7">
          <Input
            disabled
            control={control}
            name="email"
            label="Email Address *"
            wrapClassName="flex-1"
          />
          <button
            onClick={() => setEmailModalOpen(true)}
            className="h-11 w-16 md:w-[94px] text-primary hover:text-primary/80 text-xs sm:text-sm font-semibold mt-0.5"
          >
            Change
          </button>
        </div>
      </div>
      <input
        ref={uploadRef}
        type="file"
        accept={'image/*'}
        className="hidden"
        onChange={handleUpload}
      />
      <Modal
        show={isPhoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        panelClassName={'w-[400px] p-8'}
      >
        {!isOtpSent ? (
          <SendOtp
            description="Please enter your new Mobile number"
            onContinue={() => setOtpSent(true)}
          />
        ) : (
          <OtpVerify
            title="Verify"
            onVerify={() => {
              setPhoneModalOpen(false);
              setOtpSent(false);
            }}
          />
        )}
      </Modal>
      <Modal
        show={isEmailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        panelClassName={'w-[400px] p-8'}
      >
        {!isOtpSent ? (
          <>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-secondary">
                <BiEnvelope className="text-2xl text-[#344054]" />
              </div>
              <p className="text-sm text-neutral-500 mt-1 text-center">
                Please enter your new email address
              </p>
            </div>
            <Input
              wrapClassName="mt-8"
              control={otpControl}
              name="new_email"
              label="Email Address *"
              placeholder="example@email.com"
              rules={{
                required: 'Email Address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
            />
            <Button
              disabled={!isEmailFormDirty}
              onClick={handleOtpSubmit(sentOtp)}
              className="mt-6"
            >
              Continue
            </Button>
          </>
        ) : (
          <OtpVerify
            title="Verify"
            onVerify={() => {
              setEmailModalOpen(false);
              setOtpSent(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Profile;
