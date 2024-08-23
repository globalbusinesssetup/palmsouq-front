'use client';
import { Button, Header } from '@/components';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { features, cardCategoryData } from '@/constants';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FaAngleDown } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/api';

type CategoryProps = {
  params: {
    category: string;
    id: string | number;
  };
};

const packages = [
  {
    quantity: 100,
    price: 0,
  },
  {
    quantity: 200,
    price: 0,
  },
  {
    quantity: 300,
    price: 0,
  },
  {
    quantity: 500,
    price: 0,
  },
  {
    quantity: 1000,
    price: 0,
  },
  {
    quantity: 2000,
    price: 0,
  },
  {
    quantity: 3000,
    price: 0,
  },
  {
    quantity: 5000,
    price: 0,
  },
];

const paperStocks = [
  {
    label: '170 Gsm',
    value: '170gsm',
  },
  {
    label: '150 Gsm',
    value: '150gsm',
  },
  {
    label: '135 Gsm',
    value: '135gsm',
  },
  {
    label: '90 Gsm',
    value: '90gsm',
  },
];
const brochurePaperStocks = [
  {
    label: '170 Gsm',
    value: '170gsm',
  },
  {
    label: '150 Gsm',
    value: '150gsm',
  },
  {
    label: '135 Gsm',
    value: '135gsm',
  },
  {
    label: '115 Gsm',
    value: '115gsm',
  },
];
const paperSets = [
  {
    label: '1+1 (50 Sets)',
    value: '1+1(50Sets)',
  },
  {
    label: '1+2 (50 Sets)',
    value: '1+2(50Sets)',
  },
  {
    label: '1+1 (100 Sets)',
    value: '1+1(100Sets)',
  },
  {
    label: '1+2 (100 Sets)',
    value: '1+2(100Sets)',
  },
];

const timelines = [
  { label: 'Standard', value: 'standard' },
  { label: 'Urgent', value: 'urgent' },
];

const ProductDeatils: React.FC<CategoryProps> = ({ params }) => {
  const router = useRouter();
  const [selectedType, setType] = useState('');
  const [selectedTimeline, setTimeline] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [selectedImage, setImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct({ categoryId: params.category, id: params.id }),
  });

  const handleQuantity = (type: 'minus' | 'plus' | number) => {
    if (type === 'plus') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'minus') {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(type);
    }
  };

  console.log('product =>', product);

  return (
    <>
      <Header />
      <main className="container mx-auto mt-6 sm:mt-8 bg-[#FCFCFD] px-4">
        <div className="p-3 sm:p-4 md:p-5 xl:p-6 border border-neutral-200 bg-white rounded-xl lg:flex gap-x-6 xl:gap-x-8 space-y-6 lg:space-y-0">
          {/* Left side  */}
          <div className="lg:w-5/12">
            <div className="w-full h-60 xs:h-[300px] sm:h-[396px] rounded-lg overflow-hidden relative bg-secondary">
              <Image
                src={'/categories/paper-bags.png'}
                fill
                alt="product image"
                // className="object-cover"
              />
            </div>
            <div className="flex items-center gap-x-2 xs:gap-x-3 xl:gap-x-4 mt-4">
              {Array(3)
                .fill(' ')
                .map((_, i) => (
                  <div
                    onClick={() => setImage(i)}
                    key={`image_${i}`}
                    className={`w-full max-w-[156px] h-20 xs:h-24 lg:h-20 xl:h-[101px] rounded-lg overflow-hidden border relative cursor-pointer bg-secondary transition-all duration-200 ${
                      selectedImage === i
                        ? 'border-primary/50'
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={'/categories/paper-bags.png'}
                      fill
                      alt="product image"
                    />
                  </div>
                ))}
            </div>
            <div className="mt-4 py-4 px-[30px] flex items-center justify-center gap-x-4 border border-neutral-100 bg-neutral-100 rounded-lg">
              <Image
                src={'/icons/free-delivery.svg'}
                width={105}
                height={38}
                alt="icon"
                className=" w-20 h-8 xs:w-[105px] xs:h-[38px]"
              />
              <div className="flex-1 text-center">
                <p className="text-tiny xl:text-xs text-neutral-700">
                  Express, Free Delivery
                </p>
                <h4 className="text-xs xl:text-sm text-neutral-900 font-bold">
                  Dubai, Sharjah and Ajman
                </h4>
              </div>
              <Image
                src={'/icons/any-location.svg'}
                width={75}
                height={40}
                alt="icon"
                className="hidden xs:block"
              />
            </div>
            <div className="mt-4 py-[18px] flex flex-wrap items-center justify-center gap-4 px-2 border border-neutral-100 bg-neutral-100 rounded-lg">
              {features.slice(1).map((feature, i) => (
                <div
                  key={`feature_${i}`}
                  className="flex items-center gap-x-2 xl:gap-x-3"
                >
                  <div className="size-4 xs:size-6 xl:size-[33px] relative rounded-full flex items-center justify-center bg-neutral-50">
                    <Image src={feature.icon} fill alt="icon" />
                  </div>
                  <div className="">
                    <h6 className="text-tiny leading-[17px] font-semibold text-neutral-700">
                      {feature.title}
                    </h6>
                    <p className="text-[8px] leading-[9px] text-neutral-500">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* right side */}
          <div className="flex-1">
            <p className="font-medium text-success text-sm lg:text-base">
              Business Card
            </p>
            <h2 className="text-xl lg:text-2xl text-black font-semibold mt-1">
              350 Gsm Matt Lamination
            </h2>
            <div className="flex-1 flex flex-wrap items-center gap-2 xl:gap-3 py-4 border-b border-[#E6E6E6]">
              {cardCategoryData.map((type, i) => (
                <p
                  key={`type_${i}`}
                  className={`flex items-center justify-center text-xs xl:text-sm font-medium px-4 xl:px-5 h-8 xl:h-[34px] rounded-full ${
                    type.value === selectedType
                      ? 'text-white bg-primary'
                      : 'text-neutral-600 bg-neutral-100'
                  }`}
                >
                  {type.label}
                </p>
              ))}
            </div>
            <div className="flex items-end justify-between pt-8 pb-4">
              <div className="">
                <label className="text-sm font-medium text-[#344054]">
                  Quantity
                </label>
                <div className="flex items-center gap-x-3.5 px-4 py-2.5 lg:py-3.5 border border-[#D0D5DD] rounded-lg mt-2">
                  <button
                    disabled={quantity === 1}
                    onClick={() => handleQuantity('minus')}
                    className="size-5 lg:size-7 flex items-center justify-center rounded bg-neutral-100"
                  >
                    <FiMinus />
                  </button>
                  <input
                    value={quantity}
                    onChange={(e: any) => setQuantity(e.target.value)}
                    type="number"
                    className="w-8 sm:w-9 lg:w-11 focus-visible:outline-none pb-1 border-b text-[#344054] no-number-input-appearance m-0 text-center text-sm lg:text-base"
                  />
                  <button
                    onClick={() => handleQuantity('plus')}
                    className="size-5 lg:size-7 flex items-center justify-center rounded bg-neutral-100"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              <div className="px-4 sm:px-6 py-2 rounded-lg bg-[#F8F9FC]">
                <h4 className="md:text-lg lg:text-xl text-[#4E5BA6] font-bold">
                  00 AED
                </h4>
                <p className="text-tiny sm:text-xs lg:text-sm text-neutral-500">
                  Estimated Total (Exc. Vat)
                </p>
              </div>
            </div>
            {/* quantities */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 items-center gap-3 lg:gap-4">
              {packages.map((pkg, i) => (
                <button
                  onClick={() => handleQuantity(pkg.quantity)}
                  key={`pkg_${i}`}
                  className={`px-5 lg:px-9 py-2.5 border rounded-lg text-left transition-all duration-300 ${
                    pkg.quantity === quantity
                      ? 'border-primary shadow-md shadow-[#0021690D] bg-neutral-50'
                      : 'border-[#D0D5DD]'
                  }`}
                >
                  <h6 className="text-xs lg:text-sm font-semibold text-left text-primary">
                    {pkg.quantity}
                  </h6>
                  <p className="text-tiny lg:text-xs text-primary">
                    {pkg.price.toFixed()} (AED)
                  </p>
                </button>
              ))}
            </div>
            {params.category === 'flyers' ? (
              <div className="mt-8">
                <label className="text-sm font-medium text-[#344054]">
                  Paper Stock
                </label>
                <div className="flex flex-wrap items-center gap-x-3 lg:gap-x-4 gap-y-2 mt-2">
                  {paperStocks.map((stock, i) => (
                    <button
                      key={`stock_${i}`}
                      className="w-24 lg:w-[126px] h-9 lg:h-12 rounded-md lg:rounded-lg text-xs lg:text-sm font-medium lg:font-semibold text-[#344054] border border-[#D0D5DD]"
                    >
                      {stock.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : params.category === 'brochures' ? (
              <div className="mt-8">
                <label className="text-sm font-medium text-[#344054]">
                  Paper Stock
                </label>
                <div className="flex flex-wrap items-center gap-x-3 lg:gap-x-4 gap-y-2 mt-2">
                  {brochurePaperStocks.map((stock, i) => (
                    <button
                      key={`brochurePaper_${i}`}
                      className="w-24 lg:w-[126px] h-9 lg:h-12 rounded-md lg:rounded-lg text-xs lg:text-sm font-medium lg:font-semibold text-[#344054] border border-[#D0D5DD]"
                    >
                      {stock.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : params.category === 'bill-books' ? (
              <div className="mt-8">
                <label className="text-sm font-medium text-[#344054]">
                  Paper Stock
                </label>
                <div className="flex flex-wrap items-center gap-x-3 lg:gap-x-4 gap-y-2 mt-2">
                  {paperSets.map((stock, i) => (
                    <button
                      key={`paperSets_${i}`}
                      className="w-24 lg:w-[126px] h-9 lg:h-12 rounded-md lg:rounded-lg text-xs lg:text-sm font-medium lg:font-semibold text-[#344054] border border-[#D0D5DD]"
                    >
                      {stock.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : undefined}
            {/* timeline  */}
            <div className="mt-8">
              <label className="text-sm font-medium text-[#344054]">
                Timeline
              </label>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-x-4">
                  {timelines.map((timeline, i) => (
                    <button
                      key={`timeline_${i}`}
                      onClick={() => setTimeline(timeline.value)}
                      className={`w-20 sm:w-[100px] lg:w-[126px] h-8 sm:h-9 lg:h-12 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium sm:font-semibold text-[#344054] border transition-all duration-300  ${
                        selectedTimeline === timeline.value
                          ? 'border-primary shadow-md shadow-#D0D5DD] bg-neutral-50'
                          : 'border-[#D0D5DD]'
                      }`}
                    >
                      {timeline.label}
                    </button>
                  ))}
                </div>
                <div className="">
                  <button className="w-24 sm:w-28 lg:w-[136px] h-9 lg:h-12 bg-neutral-100 rounded-lg text-xs sm:text-sm font-semibold text-neutral-600">
                    Bothside
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-8 px-3 sm:px-4 py-1 xs:py-2 sm:py-3 xl:py-3.5 border border-dashed border-neutral-400 rounded-lg xl:rounded-[10px] flex items-center justify-between">
              <p className="text-tiny sm:text-xs xl:text-sm text-neutral-600 flex-1">
                Based on selection, your order will be ready within next
              </p>
              <span className="text-tiny sm:text-xs xl:text-sm text-[#3F206A] whitespace-nowrap font-medium py-1 px-2 sm:px-3 bg-neutral-100 border rounded-full border-[#EAECF0]">
                24 Business Hours
              </span>
            </div>
            <div className="flex justify-end mt-8">
              <Button
                onClick={() => router.push('/order')}
                className="h-11 w-[167px]"
              >
                Yalla Let&apos;s Go
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 lg:mt-8 pb-10">
          <Disclosure
            as="div"
            className={'border border-neutral-200 rounded-xl overflow-hidden'}
            defaultOpen={false}
          >
            <DisclosureButton className="group w-full flex data-[open]:border-b items-center justify-between py-2.5 lg:py-3 px-4 lg:px-6 bg-white">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 font-semibold">
                Product Description
              </span>
              <div className="group-data-[open]:rotate-180 size-6 lg:size-8 flex items-center justify-center rounded-full bg-neutral-100">
                <FaAngleDown className="text-sm lg:text-base text-[#344054]" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="pt-4 lg:pt-5 text-sm lg:text-base bg-white text-neutral-500 px-4 lg:px-5 transition-all duration-0 pb-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequuntur explicabo earum quo labore, qui a? Error nulla, id
              temporibus quos a dignissimos voluptatibus vel quis quidem, non
              earum alias? Ipsam. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Odio quae amet delectus quos autem quaerat
              eveniet mollitia, commodi fugiat earum. Nihil ipsum est tempore
              perspiciatis officia rerum cumque labore ab. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ad deleniti quia modi dolorem
              asperiores qui. Perferendis dolore obcaecati laboriosam corrupti
              sit autem, velit cupiditate aspernatur aliquam, eius corporis
              explicabo magnam.
            </DisclosurePanel>
          </Disclosure>
        </div>
      </main>
    </>
  );
};

export default ProductDeatils;
