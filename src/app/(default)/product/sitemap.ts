import { getAllProducts } from '@/utils/api';
import { MetadataRoute } from 'next';

export async function generateSitemaps() {
  const data = await getAllProducts();
  return Array(data.lastpage)
    .fill(' ')
    .map((_, idx) => ({
      id: idx,
    }));
}

export default async function sitemap({ id }): Promise<MetadataRoute.Sitemap> {
  const data = await getAllProducts(id + 1);
  const items = data?.products || [];
  return items.map((item) => ({
    url: `https://sukransouq.com/${item.category[0].id}/${item.slug}/${item.id}`,
    lastModified: new Date(),
  }));
}
