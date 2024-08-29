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

export const imageBase = 'http://printcraft.ae/uploads/';

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
  setate: string
) => Object.values(countries[country].states[setate].name);
