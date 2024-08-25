import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { HiArrowNarrowRight, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { topBarCategories } from '@/constants';
import useAuth from '@/hooks/useAuth';
const CategoriesBar = () => {
  const { categories } = useAuth();

  return (
    <div className="py-2 border-b">
      <div className="container mx-auto flex items-center gap-x-4 xl:gap-x-[30px] px-4">
        <Menu>
          <MenuButton className="group flex-auto sm:flex-none text-left gap-2 xl:gap-4 flex items-center justify-between bg-primary rounded-md lg:rounded-lg py-2 xl:py-3 px-3 xl:px-5 text-white text-sm xl:text-base font-medium xl:font-semibold">
            <div className="flex items-center gap-2 xl:gap-3 flex-1">
              <HiOutlineMenuAlt2 className="text-base xl:text-xl" /> Browse
              Categories
            </div>
            <IoChevronDown className="text-lg xl:text-xl" />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="bg-primary w-[calc(100%-40px)] sm:w-[200px] xl:w-[250px] mt-1 py-3 rounded-lg z-10"
          >
            {categories.map((cat, i) => (
              <MenuItem key={i}>
                <Link
                  className="block text-white text-sm xl:text-base data-[focus]:bg-[#F5F5F7]/30 py-2 px-5 border-t-[1px] last:border-y border-[#F5F5F7]/30"
                  href={`/categories/${cat.slug}`}
                >
                  {cat.title}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        <div className="w-[1px] h-[26px] bg-[#E1E1E1] hidden sm:block" />
        <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-[30px]">
          {topBarCategories.map((cat, i) => (
            <Link
              key={`cat_${i}`}
              href={'#'}
              className="flex items-center gap-x-1 text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold"
            >
              {cat.title}
              <IoChevronDown className="text-lg xl:text-xl mt-0.5" />
            </Link>
          ))}
        </div>
        <div className="flex-1 hidden sm:flex items-center justify-end lg:justify-between gap-x-5">
          <Link
            href={'#'}
            className="text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold block"
          >
            New Arrival
          </Link>
          <Link
            href={'#'}
            className="text-sm xl:text-base font-medium xl:font-semibold flex items-center gap-x-1 text-[#16A34A] hover:text-[#16A34A]/70"
          >
            Get A Quote
            <HiArrowNarrowRight className="text-lg xl:text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
