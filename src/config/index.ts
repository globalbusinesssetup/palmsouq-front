const baseApi = process.env.NEXT_PUBLIC_API_URL;
const config = {
  baseApi: baseApi + 'api/v1',
  imgUri: baseApi + 'uploads/',
  defaultImage: 'default-image.webp'
};

export default config;
