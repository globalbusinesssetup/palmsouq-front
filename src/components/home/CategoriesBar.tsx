import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { HiArrowNarrowRight, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { topBarCategories } from '@/constants';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
const CategoriesBar = () => {
  const { categories } = useAuth();

  return (
    <div className="py-2 border-b">
      <div className="container mx-auto flex items-center gap-x-4 xl:gap-x-[30px] px-4">
        <Menu
          as="div"
          className="relative flex-1 lg:flex-none inline-block text-left"
        >
          <MenuButton className="group w-full lg:w-auto flex-auto lg:flex-none text-left gap-2 xl:gap-4 flex items-center justify-between bg-primary rounded-md lg:rounded-lg py-2 xl:py-3 px-3 xl:px-5 text-white text-sm xl:text-base font-medium xl:font-semibold">
            <div className="flex items-center gap-2 xl:gap-3 flex-1">
              <HiOutlineMenuAlt2 className="text-base xl:text-xl" /> Browse
              Categories
            </div>
            <IoChevronDown className="text-lg xl:text-xl" />
          </MenuButton>

          <MenuItems className="absolute mt-2 bg-primary w-[calc(100%)] lg:w-[200px] xl:w-[250px] py-3 rounded-lg z-10">
            {categories.map((cat, i) => (
              <MenuItem
                key={i}
                as="div"
                className={`relative group ${
                  i === 0 && 'border-t border-[#F5F5F7]/30'
                }`}
              >
                {/* Main Category */}
                <Link
                  className="flex items-center justify-between w-full hover:bg-white/10 transition-all duration-300 pl-5 pr-2 py-2 text-sm xl:text-base text-white border-b border-[#F5F5F7]/30"
                  href={`/categories/${cat.slug}`}
                >
                  {cat.title}
                  {/* Chevron for subcategories */}
                  {cat?.public_sub_categories?.length > 0 && (
                    <IoChevronForward className="text-lg" />
                  )}
                </Link>

                {/* Subcategories - show on hover */}
                {cat?.public_sub_categories?.length > 0 && (
                  <div className="absolute bg-primary left-full top-0 hidden group-hover:block bg-primary-light w-[200px] xl:w-[250px] rounded z-10">
                    {cat.public_sub_categories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        href={`/categories/${subcat.slug}`}
                        className="block text-sm xl:text-base text-white hover:bg-white/10 transition-all duration-300 py-2 px-5 border-t-[1px] last:border-y border-[#F5F5F7]/30"
                      >
                        {subcat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        {/* <div className="w-[1px] h-[26px] bg-[#E1E1E1] hidden sm:block" />
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
        </div> */}
        <div className="flex-1 hidden lg:flex items-center justify-end lg:justify-end gap-x-5">
          {/* <Link
            href={'#'}
            className="text-[#6B7280] hover:text-primary/90 text-sm xl:text-base font-medium xl:font-semibold block"
          >
            New Arrival
          </Link> */}
          <Link href={'#'} className="w-[140px] h-12 relative">
            <Image
              fill
              src={'/banners/offer.jpeg'}
              alt="special offer"
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
