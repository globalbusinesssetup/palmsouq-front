import { Button } from '@headlessui/react';
import React, { ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

type CustomButtonProps = {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  outlined?: boolean;
};

const CustomButton = ({
  onClick,
  children,
  className,
  loading = false,
  outlined,
  disabled,
  ...rest
}: CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...rest}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={twMerge(
        `w-full py-2.5 px-2 active:scale-90 disabled:active:scale-100 transition-all duration-300 rounded-lg text-white border text-sm lg:text-base ${
          outlined
            ? 'bg-transparent border-primary text-primary hover:bg-primary disabled:hover:bg-transparent hover:text-white disabled:hover:text-primary disabled:opacity-35'
            : 'bg-primary border-primary/50 hover:bg-transparent hover:text-primary disabled:border-transparent disabled:bg-primary/55 disabled:text-white'
        }`,
        className
      )}
    >
      {loading ? <FiLoader className="animate-spin mx-auto" /> : children}
    </Button>
  );
};

export default CustomButton;
