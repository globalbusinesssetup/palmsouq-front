'use client';
import { Input } from '@headlessui/react';
import React, { ReactNode, useRef, useState } from 'react';
import { FiEye, FiEyeOff, FiSearch, FiUpload } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { IoSearch } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import {
  UseControllerProps,
  useController,
  Controller,
  useFormContext,
} from 'react-hook-form';

type InputType = 'password' | 'phone' | 'file' | 'search';

interface BaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  wrapClassName?: string;
  className?: string;
  rules?: any;
  control?: any;
  onChange?: (val: any) => void;
}

interface PhoneProps extends BaseProps {
  type: 'phone';
  // setError?: any;
  clearErrors: any;
}

interface NonPhoneProps extends BaseProps {
  type?: Omit<InputType, 'phone'>;
}

type IProps = PhoneProps | NonPhoneProps;

const CustomInput = ({
  label,
  name,
  type,
  placeholder,
  wrapClassName,
  className,
  rules,
  control,
  onChange,
  // setError,
  clearErrors,
  ...rest
}: IProps) => {
  const {
    field,
    fieldState: { error },
  } = useController<UseControllerProps>({ name, control, rules });
  const uploadRef = useRef<HTMLInputElement>(null);
  const [isShow, setShow] = useState(false);
  const [phonValue, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handlePhoneChange = (
    phone: string,
    onChange: (val: string) => void
  ) => {
    setValue(phone);
    onChange(phone);

    // Validate phone number
    try {
      const phoneNumber = parsePhoneNumber(phone, 'AE'); 
      const valid = isValidPhoneNumber(phoneNumber.number);
      setIsValid(valid);
      if (!valid) {
        // setError(name, {
        //   type: 'validation',
        //   message: 'Please input a valid number',
        // });
        console.log("Valid")
      } else {
        clearErrors(name); // Clear errors if the phone number is valid
      }
    } catch (error) {
      setIsValid(false);
      // setError(name, {
      //   type: 'validation',
      //   message: 'Please input a valid number',
      // });
      console.log('Phone number validation error:', error);
    }
  };

  return (
    <div className={`flex flex-col ${wrapClassName}`}>
      {label && (
        <label className="mb-1.5 text-[#344054] text-sm font-medium">
          {label}
        </label>
      )}
      {type == 'password' ? (
        <div className="relative">
          <Input
            {...field}
            {...rest}
            name={name}
            type={isShow ? 'text' : 'password'}
            placeholder={placeholder}
            className={twMerge(
              `border rounded-lg h-11 w-full focus-visible:outline-neutral-300 pl-3.5 pr-[38px] py-2.5 text-[#667085] ${
                error ? 'border-red-500' : 'border-[#D0D5DD]'
              }`,
              className
            )}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
          >
            {isShow ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      ) : type === 'phone' ? (
        <>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <PhoneInput
                onBlur={onBlur}
                country={'ae'}
                value={value}
                onChange={(val) => handlePhoneChange(val, onChange)}
                containerClass={`h-11 border px-3.5 rounded-lg pl-0 ${
                  isValid ? 'border-[#D0D5DD]' : 'border-red-500'
                }`}
                countryCodeEditable={false}
                inputClass="!h-full !w-full !border-none !pl-[68px] !rounded-lg"
              />
            )}
          />
          {/* {!isValid && (
            <p className="text-red-500 text-xs mt-0.5">Invalid phone number</p>
          )} */}
        </>
      ) : type === 'file' ? (
        <>
          <input
            {...field}
            {...rest}
            ref={uploadRef}
            type="file"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => uploadRef.current?.click()}
            className="border-2 border-dashed border-neutral-300 bg-neutral-50 rounded-lg h-12 flex-1 py-2.5 flex items-center justify-center gap-2"
          >
            <FiUpload className="text-xl text-neutral-600" />
            <p className="text-sm font-semibold text-[#6835B1] text-center">
              Upload File
            </p>
          </button>
        </>
      ) : type === 'search' ? (
        <div className="relative">
          <Input
            {...field}
            {...rest}
            name={name}
            type="text"
            placeholder={placeholder}
            className={twMerge(
              'rounded-lg bg-neutral-50 h-11 w-full focus-visible:outline-neutral-300 pr-3.5 pl-10 py-2.5 text-[#667085]',
              className
            )}
          />
          <button
            type="button"
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
          >
            <FiSearch className="text-xl" />
          </button>
        </div>
      ) : (
        <Input
          {...field}
          {...rest}
          name={name}
          type="text"
          placeholder={placeholder}
          className={twMerge(
            'border border-[#D0D5DD] rounded-lg h-11 w-full focus-visible:outline-neutral-300 px-3.5 py-2.5 text-[#667085]',
            className
          )}
        />
      )}
      <p
        className={`text-red-500 text-xs mt-0.5 ml-0.5 ${
          error ? 'visible' : 'invisible'
        }`}
      >
        {error?.message}
      </p>
    </div>
  );
};

export default CustomInput;
