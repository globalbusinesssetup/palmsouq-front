import React, { ReactNode } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { Select, SelectProps } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

const CustomSelect = ({
  children,
  wrapClassName,
  ...rest
}: {
  children: ReactNode;
  wrapClassName?: string;
} & SelectProps) => {
  return (
    <div className={twMerge('relative text-[#667085]', wrapClassName)}>
      <Select
        {...rest}
        className="bg-transparent w-full appearance-none focus-visible:outline-none mt-1.5 text-[#667085] border px-3.5 pr-5 py-2.5 rounded-lg"
      >
        {children}
      </Select>
      <FaAngleDown className="absolute top-[58%] -translate-y-1/2 right-3 text-sm" />
    </div>
  );
};

export default CustomSelect;
