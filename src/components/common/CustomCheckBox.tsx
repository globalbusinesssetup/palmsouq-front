import { Checkbox } from '@headlessui/react';
import path from 'path';
import React from 'react';

const CustomCheckBox = ({
  checked,
  onChange,
  id,
  outlined = false,
}: {
  checked: boolean;
  onChange: (val: any) => void;
  id?: string;
  outlined?: boolean;
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      id={id}
      className={`group block size-4 rounded overflow-hidden border bg-white data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500 ${
        outlined
          ? 'data-[checked]:bg-primary/5 border-primary flex items-center justify-center'
          : 'data-[checked]:bg-primary '
      }`}
    >
      <svg
        className={` opacity-0 group-data-[checked]:opacity-100 ${
          outlined ? 'stroke-primary size-3' : 'stroke-white'
        }`}
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
