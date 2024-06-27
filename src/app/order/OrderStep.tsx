import { StatusTypes } from '@/components/common/Tag';
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

type StepProps = {
  circleClassName?: string;
  className?: string;
  activeCircle?: string;
  title: string;
  index: number;
  lastIndex: number;
  status?: StatusTypes;
};

const OrderStep = ({
  circleClassName,
  className,
  activeCircle,
  title,
  index,
  lastIndex,
  status,
}: StepProps) => {
  const isCompleted = () => {
    switch (status) {
      case 'success':
        return index < 1;
      case 'review':
        return index <= 1;
      case 'production':
        return index <= 2;
      case 'ready':
        return index <= 3;
      case 'delivered':
        return index <= 4;
      default:
        return false;
    }
  };

  const isActive = () => {
    switch (status) {
      case 'success':
        return index < 1;
      case 'review':
        return index <= 2;
      case 'production':
        return index <= 3;
      case 'ready':
        return index <= 4;
      default:
        return false;
    }
  };

  return (
    <div className={`group ${index !== lastIndex ? 'flex-1' : ''}`}>
      <div className={twMerge(' flex items-center', className)}>
        <div className={`${index === 0 ? 'hidden' : 'flex-1'}`}>
          <div className={`w-full overflow-hidden bg-gray-200 `}>
            <div
              className={`h-[1.5px] ${
                isActive() || isCompleted() ? 'bg-green-500 w-full' : 'w-0'
              }`}
            />
          </div>
        </div>
        <div
          className={twMerge(
            `rounded-full overflow-hidden flex items-center justify-center size-5 sm:size-6 md:size-[30px] border ${
              isCompleted()
                ? 'bg-green-500 border-green-500'
                : isActive()
                ? 'border-green-500'
                : 'border-gray-200'
            }`,
            circleClassName
          )}
        >
          {isCompleted() ? (
            <FiCheck className="text-xs md:text-sm text-white" />
          ) : isActive() ? (
            <div
              className={twMerge(
                'size-2 sm:size-3 md:size-[15px] rounded-full bg-green-500',
                activeCircle
              )}
            />
          ) : null}
        </div>

        <div className={`${index === lastIndex ? 'hidden' : 'flex-1'}`}>
          <div className={`w-full overflow-hidden bg-gray-200 `}>
            <div
              className={`h-[1.5px] ${
                isActive() || isCompleted() ? 'bg-green-500 w-full' : 'w-0'
              }`}
            />
          </div>
        </div>
      </div>
      {title && (
        <p
          className={`text-tiny sm:text-xs lg:text-sm font-medium xs:font-semibold group-first:text-left group-last:text-right text-center mt-1.5 ${
            isActive() || isCompleted() ? 'text-[#111827]' : 'text-neutral-500'
          }`}
        >
          {title}
        </p>
      )}
    </div>
  );
};

export default OrderStep;
