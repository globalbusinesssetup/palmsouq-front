import React from 'react';
import { getCategories, getProduct, getProducts } from '@/utils/api';
import config from '@/config';
import ProductDeatils from './product-client';
import { Metadata, ResolvingMetadata } from 'next';

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
    title: product?.meta_title ?? product?.title,
    description: product?.meta_description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      url: `https://palmsouq.com/${product?.category_data[0]?.slug}/${product?.slug}/${product?.id}`,
      images: [config.imgUri + product?.image, ...previousImages],
      type: 'website'
    },
  };
}

export default function ProductPage({ params }: any) {
  return <ProductDeatils params={params} />;
}
