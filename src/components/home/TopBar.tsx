'use client';
import React, { useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import Link from 'next/link';
import { FiPhoneForwarded } from 'react-icons/fi';
import useAuth from '@/hooks/useAuth';
import { FaAngleDown } from 'react-icons/fa6';

const currencies = [{ name: 'AED', code: 'aed' }];

const TopBar = () => {
  const { languages, default_language, setting } = useAuth();
  const [language, setLanguage] = useState(default_language);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  return (
    <div className="bg-primary px-auto py-2 hidden lg:block">
      <div className="container mx-auto flex items-center justify-between px-4">
        <p className="text-neutral-50 text-sm">
          Outdoor & Adventure solution, Palmsouq welcomes you
        </p>
        <div className="flex items-center justify-end gap-2">
          <p className="text-neutral-50 text-xs flex items-center gap-x-2">
            <FiPhoneForwarded className="text-sm text-white" />
            Support:
            <Link
              href={`tel:${setting?.phone ?? '4534345656'}`}
              className="text-xs font-semibold"
            >
              {setting?.phone ?? '4534345656'}
            </Link>
          </p>
          <div className="w-[1px] h-3.5 bg-neutral-400" />
          <Listbox value={language} onChange={setLanguage}>
            <div className="relative">
              <ListboxButton className="w-20 flex items-center gap-x-2 bg-transparent focus-visible:outline-none text-white text-xs font-semibold">
                {language?.name} <FaAngleDown />
              </ListboxButton>
              <ListboxOptions className="absolute mt-1 w-full bg-white text-cannon rounded-md shadow-lg max-h-60 py-1 text-sm z-10">
                {languages.map((lang: { name: string; code: string }, i) => (
                  <ListboxOption
                    key={i}
                    value={lang}
                    className={`cursor-pointer select-none py-2 px-4 hover:bg-green hover:text-white`}
                  >
                    {lang?.name}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
          <div className="w-[1px] h-3.5 bg-neutral-400" />
          <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
            <div className="relative w-[65px]">
              <ListboxButton className="w-full flex items-center gap-x-2 bg-transparent focus-visible:outline-none text-white text-xs font-semibold">
                {selectedCurrency.name} <FaAngleDown />
              </ListboxButton>
              <ListboxOptions className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 py-1 text-sm z-10">
                {currencies.map((currency, index) => (
                  <ListboxOption
                    key={index}
                    value={currency}
                    className={`cursor-pointer select-none py-2 px-4 hover:bg-green hover:text-white`}
                  >
                    {currency.name}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
