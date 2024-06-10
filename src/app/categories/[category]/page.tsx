'use client';
import { Header } from '@/components';
import { Select } from '@headlessui/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import {
  billBooksTypes,
  brochuresTypes,
  cardTypes,
  flyerTypes,
  paperBagsTyps,
  paperCupsTypes,
  stickersTypes,
} from '../../../../constants';
import { useRouter } from 'next/navigation';

interface CategoryProps {
  params: {
    category: string;
  };
}

const Category: React.FC<CategoryProps> = ({ params }) => {
  const router = useRouter();
  const [selectedCat, setCat] = useState('all');
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoryData = () => {
      switch (params.category) {
        case 'business-card':
          return cardTypes;
        case 'flyers':
          return flyerTypes;
        case 'brochures':
          return brochuresTypes;
        case 'stickers':
          return stickersTypes;
        case 'paper-bags':
          return paperBagsTyps;
        case 'paper-cups':
          return paperCupsTypes;
        case 'bill-books':
          return billBooksTypes;
        default:
          router.push('/');
          return [];
      }
    };
    setCategoryData(fetchCategoryData());
  }, [params.category, router]);

  return (
    <>
      <Header />
      <main className="container mx-auto">
        <div className="w-full h-[200px] bg-secondary rounded-md mt-6 relative">
          <Image src={'/temp-banner.png'} fill alt="banner" />
        </div>
        <div className="mt-4 py-5 px-2 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-x-3">
            {categoryData.map((type, i) => (
              <button
                key={`type_${i}`}
                onClick={() => setCat(type.value)}
                className={`text-sm font-medium px-5 h-[34px] rounded-full transition-all duration-300 active:scale-95 ${
                  type.value === selectedCat
                    ? 'text-white bg-primary'
                    : 'text-neutral-600 bg-neutral-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Select className="min-w-[128px] h-10 px-6 py-1 border rounded-full bg-white text-[#344054] focus-visible:outline-none appearance-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
              <option value="recent">Recent</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </Select>
            <FiChevronDown
              className="group pointer-events-none absolute top-2.5 right-2.5 text-[22px] text-[#344054]"
              aria-hidden="true"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Category;
