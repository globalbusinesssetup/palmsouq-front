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
import config from '@/config';
import ProductDeatils from './product-client';
import { Metadata, ResolvingMetadata } from 'next';


// export async function generateStaticParams() {
//   // Fetch or define the paths that should be generated at build time
//   const catData = await getCategories();
//   const ids = ['1', '2', '3']; // Example ids

//   // Generate all combinations of categories and ids
//   return (
//     catData?.data.categories.flatMap(async (category) => {
//       const products = await getProducts(category.slug);
//       return products?.result?.data.map((id) => ({ category, id }));
//     }) || []
//   );
// }

// export async function generateMetadata(
//   { params }: any,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // fetch data
//   const product = await getProduct(params.id);

//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product?.meta_title ?? product?.title,
//     description: product?.meta_description,
//     openGraph: {
//       images: [config.imgUri + product?.image, ...previousImages],
//     },
//   };
// }

export default function ProductPage({ params }: any) {
  return <ProductDeatils params={params} />;
}

