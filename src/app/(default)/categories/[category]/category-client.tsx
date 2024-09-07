// app/(default)/categories/[category]/CategoryClient.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button, CheckBox, Footer, Loader, ProductCard } from '@/components';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce, imageBase } from '@/utils/helper';
import { getProducts } from '@/utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type CategoryClientProps = {
  category: string;
};

type HandleOnChangeArgs = {
  brand?: number;
  shipping?: number;
  collection?: number;
  sort?: string;
};

type Filters = {
  shipping?: string | number | number[];
  brand?: string | number | number[];
  collection?: string | number | number[];
  rating?: string | number;
  minPrice?: string | number;
  maxPrice?: string | number;
  sort?: string;
};

const banner =
  'https://images.unsplash.com/photo-1565688842882-e0b2693d349a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const CategoryClient: React.FC<CategoryClientProps> = ({ category }) => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [selectedCat, setCat] = useState('all');
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedBrands, setBrands] = useState<number[]>([]);
  const [selectedShipping, setShipping] = useState<number[]>([]);
  const [selectedCollections, setCollections] = useState<number[]>([]);
  const [selectedRating, setRating] = useState<number>(0);
  const [selectedPrice, setPrice] = useState({
    min: params.get('min') ?? '0',
    max: params.get('max') ?? '0',
  });
  const [selectedSort, setSort] = useState('');
  const min = params.get('min') ?? selectedPrice.min;
  const max = params.get('max') ?? selectedPrice.max;
  const Qrating = params.get('rating') ?? selectedRating;
  const brands = params.get('brands') ?? selectedBrands;
  const collections = params.get('collections') ?? selectedCollections;
  const shippings = params.get('shipping') ?? selectedShipping;
  const sortby = params.get('sortby');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Allproducts'],
    queryFn: () =>
      getProducts(
        category,
        min,
        max,
        Qrating,
        brands,
        collections,
        shippings,
        sortby
      ),
  });
  const [bannerError, setBannerError] = useState(false);

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

  const handleFilters = async ({
    shipping,
    brand,
    collection,
    rating,
    minPrice,
    maxPrice,
    sort,
  }: Filters) => {
    await router.push(
      `${path}?sortby=${sort}&shipping=${shipping ?? selectedShipping}&brand=${
        brand ?? selectedBrands
      }&collection=${collection ?? selectedCollections}&rating=${
        rating ?? selectedRating
      }&max=${maxPrice ?? selectedPrice.max}&min=${
        minPrice ?? selectedPrice.min
      }&page=`
    );
  };

  const handleOnChange = ({
    brand,
    shipping,
    collection,
    sort,
  }: HandleOnChangeArgs) => {
    if (brand) {
      if (selectedBrands.includes(brand)) {
        const f = selectedBrands.filter((b) => b !== brand);
        setBrands(f);
        handleFilters({ brand: f });
      } else {
        setBrands((prev) => [...prev, brand]);
        handleFilters({ brand: [...selectedBrands, brand] });
      }
    } else if (shipping) {
      if (selectedShipping.includes(shipping)) {
        const f = selectedShipping.filter((s) => s !== shipping);
        setShipping(f);
        handleFilters({ shipping: f });
      } else {
        setShipping((prev) => [...prev, shipping]);
        handleFilters({ shipping: [...selectedShipping, shipping] });
      }
    } else if (collection) {
      if (selectedCollections.includes(collection)) {
        const f = selectedCollections.filter((c) => c !== collection);
        setCollections(f);
        handleFilters({ collection: f });
      } else {
        setCollections((prev) => [...prev, collection]);
        handleFilters({ collection: [...selectedCollections, collection] });
      }
    } else if (sort) {
      handleFilters({ sort });
      setSort(sort);
    }
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <>
      <main className="bg-[#FCFCFD]">
        <div className="container mx-auto px-4">
          <div className="w-full h-[150px] md:h-[180px] lg:h-[200px] bg-secondary rounded-md mt-6 relative overflow-hidden">
            <Image
              src={bannerError ? banner : imageBase + data?.category.image!}
              fill
              alt={data?.category?.title!}
              onError={() => setBannerError(true)}
              className="object-cover"
              loading="lazy"
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
              <Select
                onChange={(e) => handleOnChange({ sort: e.target.value })}
                className="w-[90px] sm:min-w-[118px] lg:min-w-[128px] text-xs sm:text-sm lg:text-base h-8 xs:h-9 lg:h-10 px-4 lg:px-6 py-1 border rounded-full bg-white text-[#344054] focus-visible:outline-none appearance-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              >
                <option value="recent">Recent</option>
                <option value="price_low_to_high">Lowest</option>
                <option value="price_high_to_low">Highest</option>
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
                {data?.category &&
                  data?.category?.child.map((cat, i) => (
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
                <button
                  onClick={() => {
                    setPrice({ min: '', max: '' });
                    handleFilters({ minPrice: '', maxPrice: '' });
                  }}
                  className="px-2 py-2 mt-4 text-xs"
                >
                  Any price
                </button>
                <div className="flex gap-x-2 mt-2">
                  <div className="flex gap-x-3">
                    <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 divide-x">
                      <p className="text-xs text-gray-600 pr-1 font-bold">
                        AED
                      </p>
                      <input
                        type="number"
                        placeholder="Min"
                        value={selectedPrice.min}
                        onChange={(e) =>
                          setPrice((prev) => ({ ...prev, min: e.target.value }))
                        }
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
                        value={selectedPrice.max}
                        onChange={(e) =>
                          setPrice((prev) => ({ ...prev, max: e.target.value }))
                        }
                        className="px-2 py-1 w-full text-xs focus-visible:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    handleFilters({
                      minPrice: selectedPrice.min,
                      maxPrice: selectedPrice.max,
                    })
                  }
                  className="mt-4 h-8 py-0 !text-xs"
                >
                  Go
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-700 text-xl font-bold mt-3">
                  Customer reviews
                </h3>
                <button
                  onClick={() => {
                    setRating(0);
                    handleFilters({ rating: 0 });
                  }}
                  className="px-2 py-2 mt-4 text-xs"
                >
                  Clear{' '}
                </button>
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => {
                      setRating(1);
                      handleFilters({ rating: 1 });
                    }}
                    className="flex items-center gap-x-1"
                  >
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
                  <button
                    onClick={() => {
                      setRating(2);
                      handleFilters({ rating: 2 });
                    }}
                    className="flex items-center gap-x-1"
                  >
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                  <button
                    onClick={() => {
                      setRating(3);
                      handleFilters({ rating: 3 });
                    }}
                    className="flex items-center gap-x-1"
                  >
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                  <button
                    onClick={() => {
                      setRating(4);
                      handleFilters({ rating: 4 });
                    }}
                    className="flex items-center gap-x-1"
                  >
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStar size={20} className="text-orange-400" />
                    <IoMdStarOutline
                      size={20}
                      className="text-orange-400"
                    />{' '}
                    <span className="text-sm">&up</span>
                  </button>
                </div>
              </div>
              {data?.brands && (
                <div className="mt-4">
                  <h3 className="text-gray-700 text-xl font-bold mt-3">
                    Brands
                  </h3>
                  <div className="mt-3">
                    {data?.brands.map((b, i) => (
                      <div
                        key={`brand_${i}`}
                        className="flex items-center gap-x-2"
                      >
                        <CheckBox
                          checked={selectedBrands.includes(b.id)}
                          onChange={(e) => handleOnChange({ brand: b.id })}
                          id={`brand_${b.id}`}
                        />
                        <label htmlFor={`brand_${b.id}`}>{b.title}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data?.collections && (
                <div className="mt-4">
                  <h3 className="text-gray-700 text-xl font-bold">
                    Collections
                  </h3>
                  <div className="mt-3 space-y-1.5">
                    {data?.collections.map((c, i) => (
                      <div
                        key={`collections_${i}`}
                        className="flex items-center gap-x-2"
                      >
                        <CheckBox
                          checked={selectedCollections.includes(c.id)}
                          onChange={(e) => handleOnChange({ collection: c.id })}
                        />
                        {c.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data?.shipping && (
                <div className="mt-4">
                  <h3 className="text-gray-700 text-xl font-bold">
                    Shipping Options
                  </h3>
                  <div className="mt-3 space-y-1.5">
                    {data?.shipping.map((s, i) => (
                      <div
                        key={`shipping_${i}`}
                        className="flex items-center gap-x-2"
                      >
                        <CheckBox
                          checked={selectedShipping.includes(s.id)}
                          onChange={() => handleOnChange({ shipping: s.id })}
                        />
                        {s.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pl-5 flex-1 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 pt-4 pb-10">
              {isLoading ? (
                Array(8)
                  .fill('')
                  .map((_, i) => (
                    <div key={`sk_${i}`} className="max-h-[382px]">
                      <div className="w-full rounded-md h-[228px] xs:h-[180px] sm:h-[220px] md:h-[200px] xl:h-[228px] bg-gray-200 animate-pulse" />
                      <div className="h-5 w-full bg-gray-200 rounded-md mt-4" />
                      <div className="h-5 w-full bg-gray-200 rounded-md mt-4" />
                    </div>
                  ))
              ) : data?.result.data.length ? (
                data?.result.data.map((product: any, i: number) => (
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
