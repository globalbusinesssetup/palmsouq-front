'use client';
import { Input } from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { FiEye, FiEyeOff, FiSearch, FiUpload } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { Controller } from 'react-hook-form';

type InputType = 'password' | 'file' | 'search' | 'email' | 'date' | 'number';

type IProps = {
  label?: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  wrapClassName?: string;
  className?: string;
  rules?: any;
  control?: any;
  onChange?: (val: any) => void;
  error?: any;
};

const CustomInput = ({
  label,
  name,
  type,
  placeholder,
  wrapClassName,
  className,
  rules,
  control,
  onChange,
  error,
  ...rest
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [isShow, setShow] = useState(false);
  const [phonValue, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  return (
    <div className={`flex flex-col text-sm lg:text-base ${wrapClassName}`}>
      {label && (
        <label className="mb-1.5 text-[#344054] text-sm font-medium">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <>
            {type === 'password' ? (
              <div className="relative">
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  {...rest}
                  name={name}
                  type={isShow ? 'text' : 'password'}
                  placeholder={placeholder}
                  className={twMerge(
                    `border rounded-lg h-11 w-full focus-visible:outline-neutral-300 pl-3.5 pr-[38px] py-2.5 text-[#667085] ${
                      error ? 'border-red-500' : 'border-[#D0D5DD]'
                    }`,
                    className
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
                >
                  {isShow ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            ) : type === 'file' ? (
              <>
                <input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  {...rest}
                  ref={uploadRef}
                  type="file"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => uploadRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 bg-neutral-50 rounded-lg h-12 flex-1 py-2.5 flex items-center justify-center gap-2"
                >
                  <FiUpload className="text-xl text-neutral-600" />
                  <p className="text-sm font-semibold text-[#6835B1] text-center">
                    Upload File
                  </p>
                </button>
              </>
            ) : type === 'search' ? (
              <div className="relative">
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  {...rest}
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  className={twMerge(
                    'rounded-lg bg-neutral-50 h-10 sm:h-11 w-full focus-visible:outline-neutral-300 pr-3.5 pl-10 py-2 sm:py-2.5 text-[#667085]',
                    className
                  )}
                />
                <button
                  type="button"
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
                >
                  <FiSearch className="text-lg lg:text-xl" />
                </button>
              </div>
            ) : type === 'date' ? (
              <div className="relative">
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  {...rest}
                  name={name}
                  type="date"
                  placeholder={placeholder}
                  className={twMerge(
                    'border border-[#D0D5DD] rounded-lg h-11 w-full focus-visible:outline-neutral-300 px-3.5 py-2.5 text-[#667085]',
                    className
                  )}
                />
              </div>
            ) : (
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...rest}
                name={name}
                type={type}
                placeholder={placeholder}
                className={twMerge(
                  `border ${
                    error ? 'border-error' : 'border-[#D0D5DD]'
                  } rounded-lg h-11 w-full focus-visible:outline-neutral-300 px-3.5 py-2.5 text-[#667085]`,
                  className
                )}
              />
            )}
          </>
        )}
      />
      {type !== 'search' && (
        <p
          className={`text-red-500 text-xs mt-0.5 ml-0.5 min-h-4 ${
            error ? 'visible' : 'invisible'
          } ${name === 'password' && 'sm:invisible'}`}
        >
          {error?.message}
        </p>
      )}
    </div>
  );
};

export default CustomInput;

// const CustomInput = ({
//   label,
//   name,
//   type,
//   placeholder,
//   wrapClassName,
//   className,
//   rules,
//   control,
//   onChange,
//   ...rest
// }: IProps & React.InputHTMLAttributes<HTMLInputElement>) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController<UseControllerProps>({ name, control, rules });
//   const uploadRef = useRef<HTMLInputElement>(null);
//   const [isShow, setShow] = useState(false);

//   return (
//     <div className={`flex flex-col ${wrapClassName}`}>
//       {label && (
//         <label className="mb-1.5 text-[#344054] text-sm font-medium">
//           {label}
//         </label>
//       )}
// {type == 'password' ? (
//   <div className="relative">
//     <Input
//       {...field}
//       {...rest}
//       name={name}
//       type={isShow ? 'text' : 'password'}
//       placeholder={placeholder}
//       className={twMerge(
//         `border rounded-lg h-11 w-full focus-visible:outline-neutral-300 pl-3.5 pr-[38px] py-2.5 text-[#667085] ${
//           error ? 'border-red-500' : 'border-[#D0D5DD]'
//         }`,
//         className
//       )}
//     />
//     <button
//       type="button"
//       onClick={() => setShow((prev) => !prev)}
//       className="absolute top-1/2 right-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
//     >
//       {isShow ? <FiEye /> : <FiEyeOff />}
//     </button>
//   </div>
// ) : type === 'file' ? (
//   <>
//     <input
//       {...field}
//       {...rest}
//       ref={uploadRef}
//       type="file"
//       className="hidden"
//     />
//     <button
//       type="button"
//       onClick={() => uploadRef.current?.click()}
//       className="border-2 border-dashed border-neutral-300 bg-neutral-50 rounded-lg h-12 flex-1 py-2.5 flex items-center justify-center gap-2"
//     >
//       <FiUpload className="text-xl text-neutral-600" />
//       <p className="text-sm font-semibold text-[#6835B1] text-center">
//         Upload File
//       </p>
//     </button>
//   </>
// ) : type === 'search' ? (
//   <div className="relative">
//     <Input
//       {...field}
//       {...rest}
//       name={name}
//       type="text"
//       placeholder={placeholder}
//       className={twMerge(
//         'rounded-lg bg-neutral-50 h-11 w-full focus-visible:outline-neutral-300 pr-3.5 pl-10 py-2.5 text-[#667085]',
//         className
//       )}
//     />
//     <button
//       type="button"
//       className="absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#98A2B3]"
//     >
//       <FiSearch className="text-xl" />
//     </button>
//   </div>
// ) : type === 'email' ? (
//   <Input
//     {...field}
//     {...rest}
//     name={name}
//     type="email"
//     placeholder={placeholder}
//     className={twMerge(
//       'border border-[#D0D5DD] rounded-lg h-11 w-full focus-visible:outline-neutral-300 px-3.5 py-2.5 text-[#667085]',
//       className
//     )}
//   />
// ) : (
//   <Input
//     {...field}
//     {...rest}
//     name={name}
//     type="text"
//     placeholder={placeholder}
//     className={twMerge(
//       'border border-[#D0D5DD] rounded-lg h-11 w-full focus-visible:outline-neutral-300 px-3.5 py-2.5 text-[#667085]',
//       className
//     )}
//   />
// )}
//       <p
//         className={`text-red-500 text-xs mt-0.5 ml-0.5 min-h-4 ${
//           error ? 'visible' : 'invisible'
//         }`}
//       >
//         {error?.message}
//       </p>
//     </div>
//   );
// };
