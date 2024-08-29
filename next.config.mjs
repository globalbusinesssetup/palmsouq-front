/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "out",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '*',
        port: '',
      },
    ],
  },
};

export default nextConfig;
