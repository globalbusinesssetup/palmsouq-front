import { getCategories } from '@/utils/api';
import CategoryClient from './category-client';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const categories = await getCategories();
  // Ensure that an empty array is returned if categories are undefined or empty
  return (
    categories?.data?.categories?.map((cat) => ({
      category: cat.id.toString(),
    })) || []
  );
}

export const metadata: Metadata = {
  title: 'Buy products | Palmsouq',
  description: 'Products list | Palmsouq',
};

export default async function CategoryPage({ params }: any) {
  return <CategoryClient category={params.category} />;
}
