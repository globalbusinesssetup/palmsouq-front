import { getAllCategories } from '@/utils/api';
import { MetadataRoute } from 'next';

export async function generateSitemaps() {
  const data = await getAllCategories();
  return Array(data.lastpage)
    .fill(' ')
    .map((_, idx) => ({
      id: idx,
    }));
}

export default async function sitemap({ id }): Promise<MetadataRoute.Sitemap> {
  const data = await getAllCategories(id + 1);
  const items = data?.categories || [];
  return items.map((item) => ({
    url: `https://sukransouq.com/${item.slug}/`,
    lastModified: new Date(),
  }));
}
