'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoMdLogIn } from 'react-icons/io';
import PersonalForm from './PersonalForm';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import CorporateForm from './CorporateForm';
import Head from 'next/head';

const accountTypes = [
  { title: 'Personal Account', value: 'personal' },
  { title: 'Corporate Account', value: 'corporate' },
];

const Register = () => {
  const [selectedType, setSelectedType] = useState(accountTypes[0].value);
  return (
    <main className="bg-white sm:flex items-center justify-center px-4 sm:px-5">
      {/* <Head>
        <title>Register | Printcraft</title>
        <meta name="description" content="My client component description" />
      </Head> */}
      <div className="py-10">
        <div className="sm:w-[567px] border border-[#D0D5DD] rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
              <IoMdLogIn className="text-2xl text-[#344054]" />
            </div>
            <div className="text-center">
              <h4 className="text-xl sm:text-2xl font-semibold text-neutral-700">
                Registration
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Register now and join YallaPrints today!
              </p>
            </div>
          </div>
          <div className="mt-6">
            <RadioGroup
              value={selectedType}
              onChange={setSelectedType}
              aria-label="Server size"
              className={'flex items-center gap-3 sm:gap-4'}
            >
              {accountTypes.map((account) => (
                <Field
                  key={account.value}
                  className={`flex-1 flex items-center gap-2 p-3 sm:p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
                    selectedType === account.value
                      ? 'bg-neutral-50 border-[#9B9DFD]'
                      : ''
                  }`}
                >
                  <Radio
                    value={account.value}
                    className="group flex size-4 sm:size-5 items-center justify-center rounded-full border bg-white data-[checked]:border-primary duration-300 transition-all"
                  >
                    <span className="invisible size-1.5 sm:size-2 rounded-full bg-primary group-data-[checked]:visible" />
                  </Radio>
                  <Label className="text-sm sm:text-base text-[#344054] font-medium sm:font-semibold whitespace-nowrap">
                    {account.title}
                  </Label>
                </Field>
              ))}
            </RadioGroup>
          </div>
          {selectedType === 'personal' ? <PersonalForm /> : <CorporateForm />}
          <>
            <p className="text-xs text-center mt-3 text-neutral-700">
              By creating an account you agree to our{' '}
              <Link
                href={'#'}
                className="text-[#312ECB] hover:text-[#312ECB]/70 duration-200 transition-all"
              >
                Terms of service
              </Link>{' '}
              and{' '}
              <Link
                href={'#'}
                className="text-[#312ECB] hover:text-[#312ECB]/70 duration-200 transition-all"
              >
                Privacy policy
              </Link>
            </p>
          </>
        </div>
        <Link
          href={'/auth/sign-in'}
          className="mt-6 text-base font-semibold text-neutral-600 hover:text-neutral-400 duration-200 w-full text-center inline-flex items-center justify-center gap-2"
        >
          <FaArrowLeftLong /> Back to sign in
        </Link>
      </div>
    </main>
  );
};

export default Register;
