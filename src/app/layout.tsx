'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-phone-input-2/lib/style.css';
import 'swiper/css';
import 'rc-rate/assets/index.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NavigationGuardProvider } from 'next-navigation-guard';
import GlobalContextProvider, { GlobalContext } from '@/context/GlobalContext';
const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Printcraft',
//   description: 'Innovative printing solutions for all your needs!',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className}>
      <NavigationGuardProvider>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AuthProvider>
            <GlobalContextProvider>
              {children}
            </GlobalContextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NavigationGuardProvider>
      </body>
    </html>
  );
}
