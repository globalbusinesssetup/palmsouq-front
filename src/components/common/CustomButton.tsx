import { Button } from '@headlessui/react';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const CustomButton = ({
  onClick,
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Button
      {...rest}
      onClick={onClick}
      className={twMerge(
        `w-full py-2.5 active:scale-90 bg-primary border border-primary/50 hover:bg-transparent hover:text-primary transition-all duration-300 rounded-lg text-white`,
        className
      )}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
