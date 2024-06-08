'use client';
import { Input } from '@headlessui/react';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

const CustomInput = ({
  label,
  name,
  type,
  placeholder,
  wrapClassName,
}: {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  wrapClassName?: string;
}) => {
  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (phone: string) => {
    setValue(phone);

    // Validate phone number
    // try {
    //   const phoneNumber = parsePhoneNumber(phone);
    //   setIsValid(isValidPhoneNumber(phoneNumber.number));
    // } catch (error) {
    //   setIsValid(false);
    //   console.log(error);
    // }
  };

  return (
    <>
      {type == 'password' ? (
        <div className={`flex flex-col ${wrapClassName}`}>
          {label && (
            <label className="mb-1.5 text-[#344054] text-sm font-medium">
              {label}
            </label>
          )}
          <div className="relative">
            <Input
              name={name}
              type={isShow ? 'text' : 'password'}
              placeholder={placeholder}
              className="border border-[#D0D5DD] rounded-lg h-11 w-full focus-visible:outline-neutral-300 pl-3.5 pr-[38px] py-2.5 text-[#667085]"
            />
            <button
              onClick={() => setShow((prev) => !prev)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
            >
              {isShow ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>
      ) : type === 'phone' ? (
        <div className={`flex flex-col ${wrapClassName}`}>
          {label && (
            <label className="mb-1.5 text-[#344054] text-sm font-medium">
              {label}
            </label>
          )}
          <PhoneInput
            country={'ae'}
            value={value}
            onChange={handleChange}
            containerClass={`h-11 border px-3.5 rounded-lg pl-0 ${
              isValid ? 'border-[#D0D5DD]' : 'border-red-500'
            }`}
            countryCodeEditable={false}
            inputClass="!h-full !w-full !border-none"
            defaultErrorMessage="hello"
          />
          {!isValid && (
            <p className="text-red-500 text-xs mt-0.5">Invalid phone number</p>
          )}
        </div>
      ) : (
        <div className={`flex flex-col ${wrapClassName}`}>
          {label && (
            <label className="mb-1.5 text-[#344054] text-sm font-medium">
              {label}
            </label>
          )}
          <Input
            name={name}
            type="text"
            placeholder={placeholder}
            className="border border-[#D0D5DD] rounded-lg h-11 focus-visible:outline-neutral-300 px-3.5 py-2.5 text-[#667085]"
          />
        </div>
      )}
    </>
  );
};

export default CustomInput;
