import React from 'react';
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { GoDotFill } from 'react-icons/go';

export type StatusTypes =
  | 'success'
  | 'failed'
  | 'ready'
  | 'production'
  | 'delivered'
  | 'cancelled'
  | 'review';

type Tagtype = {
  status: StatusTypes;
  className?: string;
};

const Tag = ({ status, className }: Tagtype) => {
  const statusClassNames = {
    success: 'text-success bg-success/25',
    failed: 'text-error bg-error/20',
    ready: 'text-success bg-success/25',
    production: 'text-success bg-success/25',
    delivered: 'text-[#655937] bg-[#A79F8833]',
    cancelled: 'text-error bg-error/20',
    review: 'text-[#4E5BA6] bg-[#F8F9FC]',
  };

  const getStatusText = (status: Tagtype['status']) => {
    switch (status) {
      case 'success':
        return 'Success';
      case 'failed':
        return 'Failed';
      case 'ready':
        return 'Ready';
      case 'production':
        return 'Production';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      case 'review':
        return 'In Review';
      default:
        return '';
    }
  };

  const getIcon = (status: Tagtype['status']) => {
    switch (status) {
      case 'success':
      case 'delivered':
        return <IoCheckmark className="text-sm" />;
      case 'failed':
      case 'cancelled':
        return <IoCloseOutline className="text-sm" />;
      default:
        return <GoDotFill size={10} />;
    }
  };

  return (
    <div
      className={twMerge(
        `max-w-fit h-[22px] flex items-center justify-center gap-x-1 rounded-full text-xs font-medium px-2 ${statusClassNames[status]}`,
        className
      )}
    >
      {getIcon(status)}
      {getStatusText(status)}
    </div>
  );
};

export default Tag;
