'use client';
import React, { ReactNode, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { IoSearch } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { Controller } from 'react-hook-form';

type IProps = {
  label?: string;
  name: string;
  placeholder?: string;
  wrapClassName?: string;
  className?: string;
  rules?: any;
  control?: any;
  onChange?: (val: any) => void;
  //   setError?: any;
  clearErrors?: any;
  error?: any;
};

const InputPhoneNumber = ({
  label,
  name,
  placeholder,
  wrapClassName,
  className,
  rules,
  control,
  onChange,
  //   setError,
  clearErrors,
  error,
  ...rest
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handlePhoneChange = (
    phone: string,
    onChange: (val: string) => void
  ) => {
    onChange(phone);

    // Validate phone number
    try {
      const phoneNumber = parsePhoneNumber(phone, 'AE'); // Set a default country code
      setIsValid(isValidPhoneNumber(phoneNumber.number));
      const valid = isValidPhoneNumber(phoneNumber.number);
      setIsValid(valid);
      // if (!valid) {
      //   setError(name, {
      //     type: 'validation',
      //     message: 'Please input a valid number',
      //   });
      // } else {
      //   clearErrors(name); // Clear errors if the phone number is valid
      // }
    } catch (error) {
      setIsValid(false);
      // setError(name, {
      //   type: 'validation',
      //   message: 'Please input a valid number',
      // });
      console.log('Phone number validation error:', error);
    }
  };

  console.log(error);

  return (
    <div className={`flex flex-col ${wrapClassName}`}>
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
          <PhoneInput
            onBlur={onBlur}
            country={'ae'}
            value={value}
            inputProps={{ ref: ref }}
            {...rest}
            onChange={(val) => handlePhoneChange(val, onChange)}
            containerClass={`h-11 border rounded-lg ${
              isValid && !error ? 'border-[#D0D5DD]' : 'border-error'
            }`}
            countryCodeEditable={false}
            inputClass="!h-full !w-full !border-none !pl-[68px] !rounded-lg disabled:!bg-neutral-100 disabled:!text-neutral-400"
          />
        )}
      />
      <p
        className={`text-red-500 text-xs mt-0.5 ml-0.5 min-h-4 ${
          !isValid || error ? 'visible' : 'invisible'
        }`}
      >
        Please input a valid number
      </p>
    </div>
  );
};

export default InputPhoneNumber;

// const InputPhoneNumber = ({
//   label,
//   name,
//   placeholder,
//   wrapClassName,
//   className,
//   rules,
//   control,
//   onChange,
//   //   setError,
//   clearErrors,
//   ...rest
// }: IProps & React.InputHTMLAttributes<HTMLInputElement>) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController<UseControllerProps>({ name, control, rules });
//   const uploadRef = useRef<HTMLInputElement>(null);
//   const [isShow, setShow] = useState(false);
//   const [phonValue, setValue] = useState<string>('');
//   const [isValid, setIsValid] = useState<boolean>(true);

//   const handlePhoneChange = (
//     phone: string,
//     onChange: (val: string) => void
//   ) => {
//     setValue(phone);
//     onChange(phone);

//     // Validate phone number
//     try {
//       const phoneNumber = parsePhoneNumber(phone, 'AE'); // Set a default country code
//       setIsValid(isValidPhoneNumber(phoneNumber.number));
//       const valid = isValidPhoneNumber(phoneNumber.number);
//       setIsValid(valid);
//       if (!valid) {
//         setError(name, {
//           type: 'validation',
//           message: 'Please input a valid number',
//         });
//       } else {
//         clearErrors(name); // Clear errors if the phone number is valid
//       }
//     } catch (error) {
//       setIsValid(false);
//       setError(name, {
//         type: 'validation',
//         message: 'Please input a valid number',
//       });
//       console.log('Phone number validation error:', error);
//     }
//   };

//   return (
//     <div className={`flex flex-col ${wrapClassName}`}>
//       {label && (
//         <label className="mb-1.5 text-[#344054] text-sm font-medium">
//           {label}
//         </label>
//       )}
//       <Controller
//         control={control}
//         name={name}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <PhoneInput
//             onBlur={onBlur}
//             country={'ae'}
//             value={value}
//             {...rest}
//             onChange={(val) => handlePhoneChange(val, onChange)}
//             containerClass={`h-11 border rounded-lg ${
//               isValid ? 'border-[#D0D5DD]' : 'border-red-500'
//             }`}
//             countryCodeEditable={false}
//             inputClass="!h-full !w-full !border-none !pl-[68px] !rounded-lg disabled:!bg-neutral-100 disabled:!text-neutral-400"
//           />
//         )}
//       />
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
