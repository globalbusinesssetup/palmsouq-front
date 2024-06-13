import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-phone-input-2/lib/style.css';
import 'swiper/css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Printcraft',
  description: 'Innovative printing solutions for all your needs!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
