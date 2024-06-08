import React from 'react';
import { Select } from '@headlessui/react';
import Link from 'next/link';
import { FiPhoneForwarded } from 'react-icons/fi';

const TopBar = () => {
  return (
    <div className="bg-primary px-auto py-2">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-neutral-50 text-sm">
          Era of Endless Printing Solutions, Printcraft welcomes you
        </p>
        <div className="flex items-center justify-end gap-2">
          <p className="text-neutral-50 text-xs flex items-center gap-x-2">
            <FiPhoneForwarded className="text-sm text-white" />
            Support:
            <Link href={'tel:+971066265479'} className="text-xs font-semibold">
              +971066265479
            </Link>
          </p>
          <div className="w-[1px] h-3.5 bg-neutral-400" />
          <Select
            name="language"
            defaultValue={'english'}
            className="w-20 bg-transparent focus-visible:outline-none text-white text-xs font-semibold"
          >
            <option value="english" className="text-primary">
              {/* <Image src={'/us.svg'} width={20} height={18} alt="us" />{' '} */}
              English
            </option>
            <option value="arabic" className="text-primary">
              Arabic
            </option>
            <option value="active" className="text-primary">
              English
            </option>
          </Select>
          <div className="w-[1px] h-3.5 bg-neutral-400" />
          <Select
            name="currency"
            defaultValue={'aed'}
            className="w-[65px] bg-transparent focus-visible:outline-none text-white text-xs font-semibold"
          >
            <option value="aed" className="text-primary">
              AED
            </option>
            <option value="usd" className="text-primary">
              USD
            </option>
            <option value="bdt" className="text-primary">
              BDT
            </option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
