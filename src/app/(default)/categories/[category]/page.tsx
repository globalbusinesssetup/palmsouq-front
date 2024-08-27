'use client';
import { Footer, Header, Loader, ProductCard } from '@/components';
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
} from '@/constants';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProducts } from '@/utils/api';
import { AiOutlineLoading } from 'react-icons/ai';
import { Categorydata, ProductData } from '@/types';

type CategoryProps = {
  params: {
    category: string;
  };
};

// export async function getStaticPaths() {
//   const categories = await getCategories();
//   const paths = categories?.data?.categories?.map((cat: Categorydata) => ({
//     category: cat.id,
//   }));

//   return paths;
// }

const Category: React.FC<CategoryProps> = ({ params }) => {
  const router = useRouter();
  const [selectedCat, setCat] = useState('all');
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(params.category),
  });

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
          return [];
      }
    };
    setCategoryData(fetchCategoryData());
  }, [params.category, router]);

  return (
    <>
      <main className="bg-[#FCFCFD]">
        <div className="container mx-auto px-4">
          <div className="w-full h-[150px] md:h-[180px] lg:h-[200px] bg-secondary rounded-md mt-6 relative overflow-hidden">
            <Image
              src={
                'https://images.unsplash.com/photo-1565688842882-e0b2693d349a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              fill
              alt="banner"
              className="object-cover"
            />
          </div>
          <div className="mt-4 py-5 sm:px-2 flex items-center justify-between">
            <div className="flex-1 flex items-center gap-x-1 xs:gap-x-2 sm:gap-x-3">
              {categoryData.map((type, i) => (
                <button
                  key={`type_${i}`}
                  onClick={() => setCat(type.value)}
                  className={`text-xs lg:text-sm xs:font-medium px-2.5 xs:px-4 lg:px-5 h-6 xs:h-7 lg:h-[34px] rounded-full transition-all duration-300 active:scale-95 ${
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
              <Select className="w-[90px] sm:min-w-[118px] lg:min-w-[128px] text-xs sm:text-sm lg:text-base h-8 xs:h-9 lg:h-10 px-4 lg:px-6 py-1 border rounded-full bg-white text-[#344054] focus-visible:outline-none appearance-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                <option value="recent">Recent</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </Select>
              <FiChevronDown
                className="group pointer-events-none absolute top-2.5 sm:top-2 lg:top-2.5 right-2.5 sm:text-[22px] text-[#344054]"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 pt-4 pb-10">
            {isLoading ? (
              <div className="w-full h-[40vh] flex items-center justify-center xs:col-span-2 md:col-span-3 lg:col-span-4">
                <AiOutlineLoading size={40} className=" animate-spin" />
              </div>
            ) : products?.data?.length ? (
              products?.data?.map((product: ProductData, i: number) => (
                <ProductCard
                  key={`product_${i}`}
                  data={product}
                  category={params.category}
                />
              ))
            ) : (
              <div className="col-span-full h-[40vh] flex items-center justify-center text-center">
                No products found
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Category;
