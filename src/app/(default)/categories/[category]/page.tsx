
import { getCategories, getProducts } from '@/utils/api';
import CategoryClient from './category-client';

export async function generateStaticParams() {
  const categories = await getCategories(); 
  // Ensure that an empty array is returned if categories are undefined or empty
  return categories?.data?.categories?.map((cat) => ({
    category: cat.id.toString(),
  })) || [];
}

export default async function CategoryPage({ params }:any) {
  console.log(params);
  const products = await getProducts(params.category);

  return <CategoryClient products={products} category={params.category} />;
}
