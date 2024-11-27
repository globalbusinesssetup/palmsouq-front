import { Country } from '@/types';
import CryptoJS from 'crypto-js';

export const formatFileSize = (sizeInBytes: number): string => {
  const sizeInKB = sizeInBytes / 1024;
  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(2)} KB`;
  }
  const sizeInMB = sizeInKB / 1024;
  return `${sizeInMB.toFixed(2)} MB`;
};

export async function getCountryData() {
  const response = await fetch('/countries.json');
  const data = await response.json();
  return data;
}

export const orderEncrypt = (data: {
  user_token: string;
  order_method: string | number;
  voucher: any;
  time_zone: any;
}) => {
  let key = CryptoJS.enc.Hex.parse('0123456470abcdef0123456789abcdef');
  let iv = CryptoJS.enc.Hex.parse('abcdef1876343516abcdef9876543210');
  return CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv,
    padding: CryptoJS.pad.ZeroPadding,
  }).toString();
};

export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getCountryTitle = (
  countries: { [key: string]: Country },
  country: string
) => Object.values(countries[country].name);
export const getStateTitle = (
  countries: { [key: string]: Country },
  country: string,
  state: string
): string | undefined => {
  // Ensure countries, country, and state are valid
  if (!countries || !country || !state) {
    console.error('Invalid parameters:', { countries, country, state });
    return undefined;
  }

  // Access the state name safely
  const stateName = countries[country]?.states?.[state]?.name;

  if (!stateName) {
    console.error('State not found for:', { country, state });
    return undefined;
  }

  return stateName;
};

export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const temp_banner = '/banners/temp_banner.jpeg';
