'use client';
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
import React, { useState } from 'react';
import { HiArrowNarrowRight, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { topBarCategories } from '@/constants';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { useWindowWidth } from '@/hooks';
import { Categorydata } from '@/types';
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
              <Item key={`item_${i}`} cat={cat} i={i} />
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

interface ItemProps {
  cat: Categorydata;
  i: number;
}

const Item: React.FC<ItemProps> = ({ cat, i }) => {
  const [isActive, setActive] = useState(false);
  const width = useWindowWidth();

  const handleActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (width < 1024) {
      setActive((prevState) => !prevState);
    }
  };

  // Helper to render subcategories
  const renderSubCategories = () => (
    <div className="bg-primary lg:w-[200px] xl:w-[250px] rounded z-10">
      {cat.public_sub_categories?.map((subcat) => (
        <Link
          key={subcat.id}
          href={`/categories/${subcat.slug}`}
          className="block text-sm xl:text-base text-white hover:bg-white/10 transition-all duration-300 py-2 lg:px-5 border-b lg:border-t-[1px] lg:last:border-y border-[#F5F5F7]/30 pl-10"
        >
          {subcat.title}
        </Link>
      ))}
    </div>
  );

  return (
    <MenuItem
      as="div"
      className={`relative group ${
        i === 0 ? 'border-t border-[#F5F5F7]/30' : ''
      }`}
    >
      {/* Main Category */}
      <Link
        className="flex items-center justify-between w-full hover:bg-white/10 transition-all duration-300 pl-5 text-sm xl:text-base text-white border-b border-[#F5F5F7]/30"
        href={`/categories/${cat.slug}`}
      >
        <p className="py-2">{cat.title}</p>
        {/* Chevron for subcategories */}
        {cat.public_sub_categories?.length > 0 && (
          <button onClick={handleActive} className="px-3 py-2 pr-2">
            <IoChevronForward
              className={`text-lg transition-all duration-300 ${
                isActive ? 'rotate-90' : ''
              }`}
            />
          </button>
        )}
      </Link>

      {/* Show subcategories on small screens (active state) */}
      {isActive && width < 1024 && cat.public_sub_categories?.length > 0 && (
        <div className="bg-primary left-full top-0">
          {renderSubCategories()}
        </div>
      )}

      {/* Show subcategories on hover (large screens) */}
      {cat.public_sub_categories?.length > 0 && (
        <div className="lg:absolute hidden lg:group-hover:block left-full top-0">
          {renderSubCategories()}
        </div>
      )}
    </MenuItem>
  );
};
