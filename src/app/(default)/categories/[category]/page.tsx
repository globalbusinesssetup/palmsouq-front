import { getCategories, getProducts } from '@/utils/api';
import CategoryClient from './category-client';
import { Metadata, ResolvingMetadata } from 'next';
import { imageBase } from '@/utils/helper';

export async function generateStaticParams() {
  const categories = await getCategories();
  // Ensure that an empty array is returned if categories are undefined or empty
  return (
    categories?.data?.categories?.map((cat) => ({
      category: cat.id.toString(),
    })) || []
  );
}

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const cat = await getProducts(
    params.category ?? '',
    searchParams.min ?? '',
    searchParams.max ?? '',
    searchParams.Qrating ?? '',
    searchParams.brands ?? '',
    searchParams.collections ?? '',
    searchParams.shippings ?? '',
    searchParams.sortby ?? ''
  );

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: cat?.category?.meta_title,
    description: cat?.category?.meta_description,
    openGraph: {
      images: [imageBase + cat?.category.image, ...previousImages],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: any) {
  return <CategoryClient category={params.category} />;
}
