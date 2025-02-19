// create a context name GlobalContext that will handle cart and wishlist using react-query

import React, { createContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCart, getWishList } from '@/utils/api';
import { CartItem } from '@/types';
import useAuth from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { api } from '@/utils/fetcher';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export type GlobalContextType = {
  cartData: any;
  cartLoading: boolean;
  wishlistData: any;
  wishlistLoading: boolean;
  refetchCart: () => void;
  refetchWishlist: () => void;
  addToCart: (data: {productId: number, inventoryId: number, qty: number}) => void;
  buyNow: (data: {productId: number, inventoryId: number, qty: number}) => void;
  addToWishlist: (productId: number) => void;
};

export const GlobalContext = createContext<GlobalContextType | Record<string, any>>({});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {

  const  queryClient  = useQueryClient();
  const router = useRouter();
  const { user, isLoggedIn, refetchProfile, addOrders } = useAuth();
  const { data: cartData, isLoading: cartLoading, refetch:refetchCart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const { data: wishlistData, isLoading: wishlistLoading, refetch:refetchWishlist } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishList,
  });

  // handler to add item into cart, wishlist etc.

    const addToCart = async ({productId, inventoryId, qty}) => {
      const token = Cookies.get('user_token');
      try {
        const res = await api.post('/cart/action', {
          product_id: productId,
          inventory_id: inventoryId,
          quantity: qty,
          user_token: token,
        });
        if (res?.data?.data?.form) {
          toast.error(res?.data?.data?.form[0]);
        } else {
          refetchProfile();
          toast.success('Product add Successfully');
          refetchCart();
        }
      } catch (err) {
        console.log(err);
      }
    };

    const buyNow = async ({productId, inventoryId, qty}) => {
      const token = Cookies.get('user_token');
      try {
        const res = await api.post('/cart/buy-now', {
            product_id: productId,
            inventory_id: inventoryId,
            quantity: qty,
            user_token: token,
        });
        if (res?.data?.data?.form) {
          toast.error(res?.data?.data?.form[0]);
        } else {
          refetchProfile();
          refetchCart();
          router.push('/checkout');
        }
      } catch (err) {
        console.log(err);
      }
    };

    const addToWishlist = async (productId:any) => {

      if (!isLoggedIn) {
        toast.warn('Unauthorized! sign in first.');
        return;
      }

      try {
        const res = await api.post('/user/wishlist/action', {
          product_id: productId,
        });
        if (res?.data?.data?.form) {
          toast.error(res?.data?.data?.form[0]);
        } else {
          toast.success(res.data?.message);
          refetchWishlist();
          refetchProfile();
        }
        console.log('add wishlist res =>', res);
      } catch (err) {
        toast.error(err.data?.message);
      }

    };

  return (
    <GlobalContext.Provider
      value={{
        cartData,
        cartLoading,
        wishlistData,
        wishlistLoading,
        refetchCart,
        refetchWishlist,
        addToCart,
        buyNow,
        addToWishlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => React.useContext(GlobalContext);