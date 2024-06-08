import { Checkbox } from '@headlessui/react';
import React from 'react';

const CustomCheckBox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: any) => void;
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      id="remember"
      className="group block size-4 rounded border bg-white data-[checked]:bg-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
    >
      <svg
        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
};

export default CustomCheckBox;
