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
import {
  getCategories,
  getProduct,
  getProducts,
  useGetUser,
} from '@/utils/api';
import { api } from '@/utils/fetcher';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import config from '@/configs';
import ProductDeatils from './product-client';
import { Metadata, ResolvingMetadata } from 'next';
import { imageBase } from '@/utils/helper';

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

export async function generateStaticParams() {
  // Fetch or define the paths that should be generated at build time
  const catData = await getCategories();
  const ids = ['1', '2', '3']; // Example ids

  // Generate all combinations of categories and ids
  return (
    catData?.data.categories.flatMap(async (category) => {
      const products = await getProducts(category.slug);
      return products?.result?.data.map((id) => ({ category, id }));
    }) || []
  );
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const product = await getProduct(params.id);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.meta_title,
    description: product?.meta_description,
    openGraph: {
      images: [imageBase + product?.image, ...previousImages],
    },
  };
}

export default function ProductPage({ params }: any) {
  return <ProductDeatils params={params} />;
}
