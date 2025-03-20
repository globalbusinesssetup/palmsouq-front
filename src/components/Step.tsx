import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type StepProps = {
  circleClassName?: string;
  className?: string;
  isActive?: boolean;
  isCompleted?: boolean;
  icon?: ReactNode;
  title?: string;
  index: number;
};

const Step = ({
  circleClassName,
  className,
  isActive = false,
  isCompleted,
  icon,
  title,
  index,
}: StepProps) => {
  return (
    <div
      className={twMerge('flex items-center gap-x-4 min-w-[185px]', className)}
    >
      <div
        className={twMerge(
          `rounded-full overflow-hidden flex items-center justify-center size-11 ${
            isActive || isCompleted
              ? 'bg-green text-white'
              : 'bg-[#EFF0F6] text-[#6F6C90]'
          }`,
          circleClassName
        )}
      >
        {icon ?? (
          <p className={`text-xs xs:text-sm sm:text-base font-semibold`}>
            {index + 1}
          </p>
        )}
      </div>
      <div className="flex-1">
        {title && (
          <p
            className={`text-tiny sm:text-xs lg:text-sm font-medium xs:font-semibold mb-1 lg:mb-2 ${
              isActive || isCompleted ? 'text-[#4B5563]' : 'text-[#9CA3AF]'
            }`}
          >
            {title}
          </p>
        )}
        <div
          className={`w-full rounded-full overflow-hidden bg-[#EFF0F6] ${
            !title && !icon && index === 3 && 'hidden'
          }`}
        >
          <div
            className={`h-1 xs:h-[5.67px] rounded-full ${
              isActive ? 'bg-green/80 w-[50%]' : 'w-0'
            } ${isCompleted ? 'bg-green/80 w-[100%]' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Step;
