import { Button } from '@headlessui/react';
import React, { ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  outlined?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  className,
  loading = false,
  outlined,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      onClick={onClick}
      disabled={loading}
      className={twMerge(
        `w-full py-2.5 px-2 active:scale-90 disabled:scale-100  disabled:bg-primary disabled:text-white transition-all duration-300 rounded-lg text-white border ${
          outlined
            ? 'bg-transparent border-primary text-primary hover:bg-primary hover:text-white'
            : 'bg-primary border-primary/50 hover:bg-transparent hover:text-primary'
        }`,
        className
      )}
    >
      {loading ? <FiLoader className="animate-spin mx-auto" /> : children}
    </Button>
  );
};

export default CustomButton;
