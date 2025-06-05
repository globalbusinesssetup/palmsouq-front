import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sukransouq.com/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: 'https://sukransouq.com/dashboard/profile',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/dashboard/wishlist',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/cart',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/dashboard/cart',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/orders',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/dashboard/orders',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/categories',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/track-order',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/auth/sign-in',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/auth/register',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://sukransouq.com/page/legal-notice',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://sukransouq.com/page/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://sukransouq.com/page/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://sukransouq.com/page/terms-of-use',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://sukransouq.com/page/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://sukransouq.com/page/refund-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://admin.sukransouq.com/uploads/header_logo-1744976254-1.png',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://admin.sukransouq.com/uploads/footer_logo-1744976254-1.png',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
  ];
}
