import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002169',
        secondary: '#F2F4F7',
        success: '#16A34A',
        error: '#B42318',
      },
      dropShadow: {
        '3xl': [
          '0 35px 35px rgba(0, 33, 105, 0.05)',
          '0 45px 65px rgba(16, 24, 40, 0.05)',
        ],
      },
      fontSize: {
        tiny: '10px',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
