// app/(default)/[category]/CategoryClient.tsx

'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  CheckBox,
  Footer,
  Loader,
  ProductCard,
  Image,
} from '@/components';
// import Image from 'next/image';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getProducts } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { FaAngleRight } from 'react-icons/fa6';
import config from '@/config';
import Filter from './Filter';
import Drawer from 'react-modern-drawer';
import { IoFilter } from 'react-icons/io5';

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

const banner = '/banners/temp_banner.jpeg';

const CategoryClient: React.FC<CategoryClientProps> = ({ category }) => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [isOpen, setOpen] = useState(true);
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
  const brands = params.get('brand') ?? selectedBrands;
  const collections = params.get('collection') ?? selectedCollections;
  const shippings = params.get('shipping') ?? selectedShipping;
  const sortby = params.get('sortby');
  const { data, isLoading, refetch, isRefetching } = useQuery({
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
  const [isShowAll, setShowAll] = useState(false);

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
      `${path}?sortby=${sort ?? ''}&shipping=${
        shipping ?? selectedShipping
      }&brand=${brand ?? selectedBrands}&collection=${
        collection ?? selectedCollections
      }&rating=${rating ?? selectedRating}&max=${
        maxPrice ?? selectedPrice.max
      }&min=${minPrice ?? selectedPrice.min}&page=`
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
    if (typeof brands === 'string') {
      const brandNumbers = brands.split(',').map(Number);
      setBrands(brandNumbers);
    }
    if (typeof collections === 'string') {
      const collectionNumbers = collections.split(',').map(Number);
      setCollections(collectionNumbers);
    }
    if (typeof shippings === 'string') {
      const shippingNumbers = shippings.split(',').map(Number);
      setShipping(shippingNumbers);
    }
    refetch();
  }, [params, refetch]);

  const brandTitle = data?.brands?.filter((b) => b.id === Number(brands));

  return (
    <>
      <main className="bg-[#FCFCFD]">
        <div className="container mx-auto px-4">
          <div className="w-full h-[150px] md:h-[180px] lg:h-[240px] bg-secondary rounded-md mt-6 relative overflow-hidden">
            {isLoading ? (
              <div className="animate-pulse" />
            ) : (
              <Image
                defaultSrc={banner}
                isLocal
                src={data?.category?.banner_image ?? data?.brand?.banner_image}
                fill
                alt={data?.category?.title! ?? 'Category banner'}
                className="object-fit"
                loading="lazy"
              />
            )}
          </div>
          <nav aria-label="breadcrumb" className="pt-6 lg:hidden">
            <div className="flex flex-wrap space-x-1">
              {/* Home link */}
              <div>
                <Link href="/">
                  <span className="text-primary hover:underline">Home</span>
                </Link>
              </div>
              <div className="!ml-0 flex items-center">
                <FaAngleRight size={12} />
                <span className="text-gray-500">
                  {data?.category?.title ?? data?.brand?.title}
                </span>
              </div>
            </div>
          </nav>
          <div className=" lg:mt-4 py-5 sm:px-2 flex items-center justify-between">
            <nav aria-label="breadcrumb" className="pb-6 hidden lg:block">
              <div className="flex flex-wrap space-x-1">
                {/* Home link */}
                <div>
                  <Link href="/">
                    <span className="text-primary hover:underline">Home</span>
                  </Link>
                </div>
                <div className="!ml-0 flex items-center">
                  <FaAngleRight size={12} />
                  <span className="text-gray-500">
                    {data?.category?.title ?? data?.brand?.title}
                  </span>
                </div>
              </div>
            </nav>
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <IoFilter />
            </button>
            {/* <div className="flex-1 flex items-center gap-x-1 xs:gap-x-2 sm:gap-x-3">
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
            </div> */}
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
          <div className="lg:flex gap-x-5 lg:divide-x">
            <div className="hidden lg:block">
              <Filter
                data={data}
                handleFilters={handleFilters}
                setPrice={setPrice}
                setRating={setRating}
                Qrating={Qrating}
                handleOnChange={handleOnChange}
                selectedBrands={selectedBrands}
                selectedCollections={selectedCollections}
                selectedPrice={selectedPrice}
                selectedShipping={selectedShipping}
              />
            </div>
            <div className="lg:pl-5 flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 pt-4 pb-10">
              {isLoading || isRefetching ? (
                Array(8)
                  .fill('')
                  .map((_, i) => (
                    <div key={`sk_${i}`} className="max-h-[382px]">
                      <div className="w-full rounded-md h-[228px] xs:h-[180px] sm:h-[220px] md:h-[200px] xl:h-[228px] bg-gray-200 animate-pulse" />
                      <div className="h-5 w-full bg-gray-200 rounded-md mt-4" />
                      <div className="h-5 w-full bg-gray-200 rounded-md mt-4" />
                    </div>
                  ))
              ) : data?.result?.data?.length ? (
                data?.result?.data?.map((product: any, i: number) => (
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
      <Drawer open={isOpen} onClose={() => setOpen(false)} direction="left">
        <div className="p-4 h-screen overflow-y-auto">
          <Filter
            data={data}
            handleFilters={handleFilters}
            setPrice={setPrice}
            setRating={setRating}
            Qrating={Qrating}
            handleOnChange={handleOnChange}
            selectedBrands={selectedBrands}
            selectedCollections={selectedCollections}
            selectedPrice={selectedPrice}
            selectedShipping={selectedShipping}
          />
        </div>
      </Drawer>
      <Footer />
    </>
  );
};

export default CategoryClient;
