import { StatusTypes } from '@/components/common/Tag';
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

type StepProps = {
  circleClassName?: string;
  className?: string;
  activeDot?: string;
  title: string;
  index: number;
  lastIndex: number;
  status?: StatusTypes;
};

const OrderStep = ({
  circleClassName,
  className,
  activeDot,
  title,
  index,
  lastIndex,
  status,
}: StepProps) => {
  const isCompleted = () => {
    switch (status) {
      case 'pending':
        return index < 1;
      case 'confirmed':
        return index < 2;
      case 'picked_up':
        return index < 3;
      case 'on_the_way':
        return index < 4;
      case 'delivered':
        return index < 5;
      case 'cancelled':
        return index < 1;
      default:
        return false;
    }
  };

  const isActive = () => {
    switch (status) {
      case 'pending':
        return index < 2;
      case 'confirmed':
        return index <= 2;
      case 'picked_up':
        return index <= 3;
      case 'on_the_way':
        return index <= 4;
      default:
        return false;
    }
  };

  return (
    <div
      className={`group ${index !== lastIndex ? 'flex-1 first:flex-none' : ''}`}
    >
      <div className={twMerge(' flex items-center', className)}>
        <div className={`hidden sm:block ${index === 0 ? 'hidden' : 'flex-1'}`}>
          <div className={`w-full overflow-hidden bg-gray-200 `}>
            <div
              className={`h-0.5 ${
                (isActive() || isCompleted()) && status !== 'cancelled'
                  ? 'bg-green w-full'
                  : 'w-0'
              }`}
            />
          </div>
        </div>
        <div
          className={twMerge(
            `rounded-full overflow-hidden flex items-center justify-center size-6 md:size-[30px] border ${
              status === 'cancelled' && isCompleted()
                ? 'bg-neutral-200 border-neutral-200'
                : isCompleted()
                ? 'bg-green border-green'
                : isActive() && status !== 'cancelled'
                ? 'border-green'
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
                `size-3 md:size-[15px] rounded-full ${
                  status === 'cancelled' ? 'bg-gray-200' : 'bg-green'
                } `,
                activeDot
              )}
            />
          ) : null}
        </div>

        <div
          className={`hidden sm:block ${
            index === lastIndex ? 'hidden' : 'flex-1'
          }`}
        >
          <div className={`w-full overflow-hidden bg-gray-200 `}>
            <div
              className={`h-0.5 ${
                (isActive() || isCompleted()) && status !== 'cancelled'
                  ? 'bg-green w-full'
                  : 'w-0'
              }`}
            />
          </div>
        </div>
      </div>
      {title && (
        <p
          className={`hidden sm:block text-tiny sm:text-xs lg:text-sm font-medium xs:font-semibold group-first:text-left group-last:text-right text-center mt-1.5 ${
            (isActive() || isCompleted()) && status !== 'cancelled'
              ? 'text-[#111827]'
              : 'text-neutral-500'
          }`}
        >
          {title}
        </p>
      )}
      <div className={`flex sm:hidden gap-x-4 `}>
        <div
          className={`w-0.5 overflow-hidden bg-gray-200 ml-[11px] ${
            index === lastIndex && 'hidden'
          }`}
        >
          <div
            className={`w-0.5 h-10 ${
              (isActive() || isCompleted()) && status !== 'cancelled'
                ? 'bg-green w-full'
                : 'w-0'
            }`}
          />
        </div>
        <p
          className={`text-xs lg:text-sm font-medium xs:font-semibold text-center -mt-5 ml-2 ${
            (isActive() || isCompleted()) && status !== 'cancelled'
              ? 'text-[#111827]'
              : 'text-neutral-500'
          } ${index === lastIndex && 'ml-[34px]'}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default OrderStep;
