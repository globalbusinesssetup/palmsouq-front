import { getCategories, getProducts } from '@/utils/api';
import CategoryClient from './category-client';
import { Metadata, ResolvingMetadata } from 'next';
import config from '@/config'

// export async function generateStaticParams() {
//   const categories = await getCategories();
//   // Ensure that an empty array is returned if categories are undefined or empty
//   return (
//     categories?.data?.categories?.map((cat) => ({
//       category: cat.id.toString(),
//     })) || []
//   );
// }

// export async function generateMetadata(
//   { params, searchParams }: any,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // fetch data
//   const cat = await getProducts(
//     params.category ?? '',
//     searchParams.min ?? '',
//     searchParams.max ?? '',
//     searchParams.Qrating ?? '',
//     searchParams.brands ?? '',
//     searchParams.collections ?? '',
//     searchParams.shippings ?? '',
//     searchParams.sortby ?? ''
//   );

//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: cat?.category?.meta_title ?? 'Outdoor & Adventure Store | Palmsouq',
//     description:
//       cat?.category?.meta_description ??
//       'Palmsouq online shopping Outdoor & Adventure Store | Palmsouq',
//     openGraph: {
//       images: [
//         config.imgUri + (cat?.category?.image ?? cat?.brand?.image),
//         ...previousImages,
//       ],
//     },
//   };
// }

export default async function CategoryPage({ params, searchParams }: any) {
  return <CategoryClient category={params.category} />;
}
