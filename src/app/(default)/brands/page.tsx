import BrandsClient from './brands-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor & Adventure Store | Palmsouq',
  description: 'Outdoor & Adventure | Palmsouq',
};

const Brands = () => {
  return <BrandsClient />;
};

export default Brands;
