import CategriesClient from './categories-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor & Adventure Store | Palmsouq',
  description: 'Outdoor & Adventure | Palmsouq',
};

const Categories = () => {
  return <CategriesClient />;
};

export default Categories;
