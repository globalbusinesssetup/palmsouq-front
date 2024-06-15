import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const Avatar = ({
  children,
  size,
  className,
}: {
  size?: number;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        `size-[${
          size ?? '40'
        }px] rounded-full overflow-hidden flex items-center justify-center bg-primary`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Avatar;
