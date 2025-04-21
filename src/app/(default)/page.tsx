import HomeClient from './home-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor & Adventure Store | Shukransoouq',
  description: 'Outdoor & Adventure | Shukransoouq',
};

export default function Home() {
  return <HomeClient />;
}
