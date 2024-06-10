// src/declarations.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      pagination?: string;
      navigation?: string;
      autoplay?: boolean;
    };
    'swiper-slide': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
