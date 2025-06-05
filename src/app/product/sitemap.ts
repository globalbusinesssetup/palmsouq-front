import { getAllCategories, getProducts } from '@/utils/api';
import { MetadataRoute } from 'next';

// 1. Generate sitemap IDs (pagination)
export async function generateSitemaps() {
  const categoryData = await getAllCategories();
  const categories = categoryData?.data?.categories || [];

  let urls: { url: string; lastModified: Date }[] = [];

  for (const category of categories) {
    const products = await getProducts(category.slug);
    const items = products?.result?.data || [];

    urls.push(
      ...items.map((pd) => ({
        url: `https://sukransouq.com/${category.slug}/${pd.slug}/${pd.id}`,
        lastModified: pd.updated_at ? new Date(pd.updated_at) : new Date(),
      }))
    );
  }

  // Split into chunks of 50000 (Google limit)
  const chunkSize = 50000;
  const numberOfChunks = Math.ceil(urls.length / chunkSize);

  return Array.from({ length: numberOfChunks }, (_, i) => ({ id: i }));
}

// 2. Dynamic sitemap route (called by each id)
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const categoryData = await getAllCategories();
  const categories = categoryData?.data?.categories || [];

  let urls: { url: string; lastModified: Date }[] = [];

  for (const category of categories) {
    const products = await getProducts(category.slug);
    const items = products?.result?.data || [];

    urls.push(
      ...items.map((pd) => ({
        url: `https://sukransouq.com/${category.slug}/${pd.slug}/${pd.id}`,
        lastModified: pd.updated_at ? new Date(pd.updated_at) : new Date(),
      }))
    );
  }

  const chunkSize = 50000;
  const start = id * chunkSize;
  const end = start + chunkSize;

  return urls.slice(start, end);
}
