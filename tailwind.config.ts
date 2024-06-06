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
      },
      dropShadow: {
        '3xl': [
          '0 35px 35px rgba(0, 33, 105, 0.05)',
          '0 45px 65px rgba(16, 24, 40, 0.05)',
        ],
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [],
};
export default config;
