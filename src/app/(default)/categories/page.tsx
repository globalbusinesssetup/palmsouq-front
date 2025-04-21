import CategriesClient from './categories-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor & Adventure Store | Shukransoouq',
  description: 'Outdoor & Adventure | Shukransoouq',
};

const Categories = () => {
  return <CategriesClient />;
};

export default Categories;
