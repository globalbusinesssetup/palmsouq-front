// app/(default)/categories/[category]/CategoryClient.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button, CheckBox, Footer, ProductCard } from '@/components';
import Image from 'next/image';
import { Select } from '@headlessui/react';
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
import Link from 'next/link';
import { IoMdStarOutline } from 'react-icons/io';
import { IoMdStar } from 'react-icons/io';
import { ProductsCommonType } from '@/types';

type CategoryClientProps = {
  products: any; // Replace `any` with your product type
  category: string;
  categories: { id: number; title: string; slug: string }[];
  brands: ProductsCommonType[];
  shipping: ProductsCommonType[];
  collections: ProductsCommonType[];
  categoryData: { title: string; slug: string };
};

const CategoryClient: React.FC<CategoryClientProps> = ({
  products,
  category,
  categories,
  brands,
  shipping,
  collections,
}) => {
  const [selectedCat, setCat] = useState('all');
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoryData = () => {
      switch (category) {
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
  }, [category]);

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
          <div className="flex gap-x-5 divide-x">
            <div className="w-[200px] pb-5">
              <div className="space-y-2">
                {categories &&
                  categories.map((cat, i) => (
                    <Link
                      href={`/categories/${cat.slug}`}
                      key={i}
                      className="uppercase text-gray-700 inline-block"
                    >
                      {cat?.title}
                    </Link>
                  ))}
              </div>
              <div className="">
                <h3 className="text-gray-700 text-xl font-bold mt-3">Price</h3>
                <button className="px-2 py-2 mt-4 text-xs">Any price</button>
                <div className="flex gap-x-2 mt-2">
                  <div className="flex gap-x-3">
                    <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 divide-x">
                      <p className="text-xs text-gray-600 pr-1 font-bold">
                        AED
                      </p>
                      <input
                        type="number"
                        placeholder="Min"
                        className="px-2 py-1 w-full text-xs focus-visible:outline-none"
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 divide-x">
                      <p className="text-xs text-gray-600 pr-1 font-bold">
                        AED
                      </p>
                      <input
                        type="number"
                        placeholder="Max"
                        className="px-2 py-1 w-full text-xs focus-visible:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <Button className="mt-4 h-8 py-0 !text-xs">Go</Button>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-700 text-xl font-bold mt-3">
                  Customer reviews
                </h3>
                <button className="px-2 py-2 mt-4 text-xs">Clear </button>
                <div className="mt-2 space-y-2">
                  <button className="flex items-center gap-x-1">
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                  <button className="flex items-center gap-x-1">
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                  <button className="flex items-center gap-x-1">
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                  <button className="flex items-center gap-x-1">
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                </div>
              </div>
              {brands && (
                <div className="mt-4">
                  <h3 className="text-gray-700 text-xl font-bold mt-3">
                    Brands
                  </h3>
                  <div className="mt-3">
                    {brands.map((b, i) => (
                      <div
                        key={`brand_${i}`}
                        className="flex items-center gap-x-2"
                      >
                        <CheckBox checked onChange={(e) => console.log(e)} />
                        {b.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {collections && (
                <div className="mt-4">
                  <h3 className="text-gray-700 text-xl font-bold">
                    Collections
                  </h3>
                  <div className="mt-3 space-y-1.5">
                    {collections.map((c, i) => (
                      <div
                        key={`collections_${i}`}
                        className="flex items-center gap-x-2"
                      >
                        <CheckBox checked onChange={(e) => console.log(e)} />
                        {c.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {shipping && (
                <div className="mt-4">
                  <h3 className="text-gray-700 text-xl font-bold">
                    Shipping Options
                  </h3>
                  <div className="mt-3 space-y-1.5">
                    {shipping.map((s, i) => (
                      <div
                        key={`shipping_${i}`}
                        className="flex items-center gap-x-2"
                      >
                        <CheckBox checked onChange={(e) => console.log(e)} />
                        {s.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pl-5 flex-1 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 pt-4 pb-10">
              {products?.data?.length ? (
                products?.data?.map((product: any, i: number) => (
                  <ProductCard
                    key={`product_${i}`}
                    data={product}
                    category={category}
                  />
                ))
              ) : (
                <div className="col-span-full h-[40vh] flex items-center justify-center text-center">
                  No products found
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryClient;
