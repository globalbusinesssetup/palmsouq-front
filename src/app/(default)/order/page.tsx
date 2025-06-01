import React from 'react';
import OrderClient from './order-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Place order | Shukransoouq',
  description: 'Shukransoouq user Place order',
};

const Checkout = () => {
  return <OrderClient />;
};

export default Checkout;
