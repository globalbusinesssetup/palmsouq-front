'use client';
import {
  Button,
  CheckBox,
  FileAttach,
  FileSearch,
  Modal,
  ProductCard,
} from '@/components';
import { getWishList, useGetUser } from '@/utils/api';
import { api } from '@/utils/fetcher';
import { formatFileSize } from '@/utils/helper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsHandbag } from 'react-icons/bs';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FiEdit, FiEye, FiLoader, FiTrash2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoCheckmark } from 'react-icons/io5';
import { toast } from 'react-toastify';
// import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { CartItem, ProductData } from '@/types';
import useAuth from '@/hooks/useAuth';

// export const metadata: Metadata = {
//   title: 'Next.js',
// };

const checkoutData = [
  {
    title: 'Quantity',
    value: '1000',
  },
  {
    title: 'Size',
    value: '9x5.5 cm',
  },
  {
    title: 'Print Side',
    value: 'Bothside',
  },
  {
    title: 'File Type',
    value: 'Upload file',
  },
  {
    title: 'Turnaround',
    value: '24 Business Hours',
  },
];

const uploadedFiles = [
  {
    name: 'document.pdf',
    size: '25kb',
  },
  {
    name: 'document2.pdf',
    size: '35kb',
  },
];

// const initialProducts = [
//   {
//     id: 0o1,
//     title: '',
//     name: '',
//     quantity: 1000,
//     amount: '150.00',
//   },
//   {
//     id: 0o2,
//     title: '',
//     name: '',
//     quantity: 1000,
//     amount: '150.00',
//   },
// ];

const Wishlist = () => {
  const router = useRouter();
  const { addOrders, user } = useAuth();
  const [isAllChecked, setAllChecked] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishList(),
  });

  const handleDelete = async (pd: CartItem) => {
    setDeleteLoading(true);
    try {
      await api.delete(`/cart/delete/${pd?.id}`);
      toast.success('Cart Remove SuccessfullY');
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      if (selectedProducts.includes(pd)) {
        setSelectedProducts(
          selectedProducts.filter((item) => item.id !== pd.id)
        );
      }
    } catch (err) {
      console.log(err);
    }
    setDeleteLoading(false);
  };

  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
      <div className="py-3.5 px-4 sm:px-6 flex items-center justify-between">
        <h5 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-700">
          My Wish List
        </h5>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-4 p-4 pt-2">
        {isLoading ? (
          Array(12)
            .fill('')
            .map((_, i) => (
              <div key={`sk_${i}`} className="max-h-[170px] animate-pulse">
                <div className="w-full rounded-md h-[128px] xs:h-[180px] sm:h-[220px] lg:h-[138px] bg-gray-200" />
                <div className="h-4 sm:h-5 w-full bg-gray-200 rounded-md mt-2 lg:mt-4" />
              </div>
            ))
        ) : wishlist?.length! > 0 ? (
          wishlist?.map((pd: any) => (
            <ProductCard key={pd.id} isWishList data={pd.product} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[270px] text-center w-full col-span-6">
            No items found
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
