import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { HiArrowNarrowRight, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { categories, topBarCategories } from '@/constants';
const CategoriesBar = () => {
  return (
    <div className="py-2 border-b">
      <div className="container mx-auto flex items-center gap-x-[30px]">
        <div className="">
          <Menu>
            <MenuButton className="text-left gap-4 flex items-center justify-between bg-primary rounded-lg py-3 px-5 text-white text-base font-semibold">
              <div className="flex items-center gap-3">
                <HiOutlineMenuAlt2 className="text-xl" /> Browse Categories
              </div>
              <IoChevronDown className="text-xl" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="bg-primary w-[250px] mt-1 py-3 rounded-lg z-10 "
            >
              {categories.map((cat, i) => (
                <MenuItem key={i}>
                  <Link
                    className="block text-white data-[focus]:bg-[#F5F5F7]/30 py-2 px-5 border-t-[1px] last:border-y border-[#F5F5F7]/30"
                    href="#"
                  >
                    {cat.title}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
        <div className="w-[1px] h-[26px] bg-[#E1E1E1]" />
        {topBarCategories.map((cat, i) => (
          <Link
            key={`cat_${i}`}
            href={'#'}
            className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 text-base font-semibold"
          >
            {cat.title}
            <IoChevronDown className="text-xl mt-0.5" />
          </Link>
        ))}
        <div className="flex-1 flex items-center justify-between">
          <Link
            href={'#'}
            className="text-[#6B7280] hover:text-primary/90 text-base font-semibold block"
          >
            New Arrival
          </Link>
          <Link
            href={'#'}
            className="text-base font-semibold flex items-center gap-x-1 text-[#16A34A] hover:text-[#16A34A]/70"
          >
            Get A Quote
            <HiArrowNarrowRight className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
