import type { SwiperSlideProps, SwiperProps } from 'swiper/react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperProps,
        HTMLElement
      >;
      'swiper-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >;
    }
  }

  interface Window {
    gtag: (command: 'config' | 'event', id: string, params?: Record<string, any>) => void;
    fbq: (event: string, ...args: any[]) => void;
  }
}
