import React from 'react';
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

type Tagtype = {
  status: 'success' | 'failed';
  className?: string;
};

const Tag = ({ status, className }: Tagtype) => {
  return (
    <div
      className={twMerge(
        `w-[79px] h-[22px] flex items-center justify-center gap-x-1 rounded-full text-xs font-medium ${
          status === 'success'
            ? 'text-success bg-success/25'
            : 'text-error bg-error/20'
        }`,
        className
      )}
    >
      {status === 'success' ? (
        <IoCheckmark className="text-sm" />
      ) : (
        <IoCloseOutline className="text-sm" />
      )}
      {status === 'success' ? 'Success' : 'Failed'}
    </div>
  );
};

export default Tag;
