import { getCategories, getProducts } from '@/utils/api';
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
  title: 'Buy products',
  description: 'Products list | Palmsouq',
}

export default async function CategoryPage({ params }: any) {
  const res = await getProducts(params.category);

  return (
    <CategoryClient
      products={res?.result}
      categories={res?.all_categories!}
      category={params.category}
      brands={res?.brands!}
      shipping={res?.shipping!}
      collections={res?.collections!}
      categoryData={res?.category!}
    />
  );
}
