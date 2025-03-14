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
import config from '@/config';
import Script from 'next/script';
const inter = Inter({ subsets: ['latin'] });
import { GoogleAnalytics } from '@next/third-parties/google'


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
      <head>
        {/* Facebook Pixel */}
        {config.fbPixelId && (
          <>
            <Script
              id='fb-pixel'
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${config.fbPixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${config.fbPixelId}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </head>
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
      {config.gAnalyticsId && (
          <GoogleAnalytics gaId={config.gAnalyticsId} />
      )}
    </html>
  );
}
