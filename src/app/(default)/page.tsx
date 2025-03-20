import HomeClient from './home-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor & Adventure Store | Palmsouq',
  description: 'Outdoor & Adventure | Palmsouq',
};

export default function Home() {
  return <HomeClient />;
}
