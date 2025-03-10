import React from 'react';
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { GoDotFill } from 'react-icons/go';

export type StatusTypes =
  | 'pending'
  | 'unpaid'
  | 'confirmed'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

type Tagtype = {
  status: StatusTypes;
  className?: string;
};

const Tag = ({ status, className }: Tagtype) => {
  const statusClassNames = {
    pending: 'text-yellow-700 bg-orange-100',
    unpaid: 'text-yellow-700 bg-orange-100',
    confirmed: 'text-success bg-success/25',
    delivered: 'text-[#655937] bg-[#A79F8833]',
    cancelled: 'text-error bg-error/20',
    picked_up: 'text-[#655937] bg-[#A79F8833]',
    on_the_way: 'text-[#655937] bg-[#A79F8833]',
  };

  const getStatusText = (status: Tagtype['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'unpaid':
        return 'Unpaid';
      case 'confirmed':
        return 'Confirmed';
      case 'picked_up':
        return 'Picked Up';
      case 'on_the_way':
        return 'On The Way';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  const getIcon = (status: Tagtype['status']) => {
    switch (status) {
      case 'pending':
      case 'delivered':
        return <IoCheckmark className="text-sm" />;
      case 'cancelled':
        return <IoCloseOutline className="text-sm" />;
      default:
        return <GoDotFill size={10} />;
    }
  };

  return (
    <div
      className={twMerge(
        `max-w-fit h-5 lg:h-[22px] flex items-center justify-center gap-x-1 rounded-full !text-tiny lg:!text-xs font-medium px-2 ${statusClassNames[status]}`,
        className
      )}
    >
      {getIcon(status)}
      {getStatusText(status)}
    </div>
  );
};

export default Tag;
