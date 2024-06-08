'use client';
import { CategoriesBar, Footer, Header } from '@/components';
import { TopBar } from '@/components';
import { Select } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <CategoriesBar />
      <div className="container mx-auto h-[55vh]">I am dev</div>
      <Footer />
    </main>
  );
}
