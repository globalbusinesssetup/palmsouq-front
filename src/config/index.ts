const baseApi = process.env.NEXT_PUBLIC_API_URL;
const config = {
  baseApi: baseApi + 'api/v1',
  imgUri: baseApi + 'uploads/',
  defaultImage: 'default-image.webp',
  gAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
};

export default config;
