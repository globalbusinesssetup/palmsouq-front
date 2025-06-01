import BrandsClient from './brands-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor & Adventure Store | Shukransoouq',
  description: 'Outdoor & Adventure | Shukransoouq',
};

const Brands = () => {
  return <BrandsClient />;
};

export default Brands;
