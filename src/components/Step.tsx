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
              ? 'bg-[#0408E7] text-white'
              : 'bg-[#EFF0F6] text-[#6F6C90]'
          }`,
          circleClassName
        )}
      >
        {icon ?? <p className={`text-base font-semibold`}>{index + 1}</p>}
      </div>
      <div className="flex-1">
        {title && (
          <p
            className={`text-sm font-semibold ${
              isActive || isCompleted ? 'text-[#4B5563]' : 'text-[#9CA3AF]'
            }`}
          >
            {title}
          </p>
        )}
        <div
          className={`w-full rounded-full overflow-hidden mt-2 bg-[#EFF0F6] ${
            !title && !icon && index === 3 && 'hidden'
          }`}
        >
          <div
            className={`h-[5.67px] rounded-full ${
              isActive ? 'bg-[#4A3AFF] w-[50%]' : 'w-0'
            } ${isCompleted ? 'bg-[#4A3AFF] w-[100%]' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Step;
