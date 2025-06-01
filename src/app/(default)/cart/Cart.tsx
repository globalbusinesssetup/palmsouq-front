'use client';
import { Button, CheckBox, FileAttach, FileSearch, Modal } from '@/components';
import { getCart, useGetUser } from '@/utils/api';
import { api } from '@/utils/fetcher';
import { formatFileSize } from '@/utils/helper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
import config from '@/config';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalContext';

// export const metadata: Metadata = {
//   title: 'Next.js',
// };


const Cart = () => {
  const router = useRouter();
  const { refetchProfile } = useAuth();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [ids, setIds] = useState<number[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [unChecked, setUnChecked] = useState<number[] | []>([]);
  const queryClient = useQueryClient();
  const {
    cartData: cart,
    refetchCart: refetch,
    cartLoading: isLoading,
  } = useGlobalContext();

  useEffect(() => {
    if (!isLoading && cart?.data?.length) {
      const newIds: number[] = [];
      const newChecked: number[] = [];
      const newUnChecked: number[] = [];

      cart.data.forEach((pd:any) => {
        newIds.push(pd.id);
        if (pd.selected == 1) {
          newChecked.push(pd.id);
        } else {
          newUnChecked.push(pd.id);
        }
      });

      setIds(newIds);
      setChecked(newChecked);
      setUnChecked(newUnChecked);
    }
  }, [isLoading, cart]);

  const handleChecked = async (i: number, pd: CartItem) => {
    const newSelected = checked.includes(pd.id)
      ? checked.filter((id) => id !== pd.id)
      : [...checked, pd.id];
    const unSelected = ids.filter((id) => newSelected.includes(id) === false);
    try {
      await api.post('/cart/change', {
        checked: newSelected,
        unchecked: unSelected,
        isBundle: false,
      });
      setChecked(newSelected);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAll = async (isChecked: boolean) => {
    if (cart?.data?.length) {
      try {
        await api.post('/cart/change', {
          checked: isChecked ? ids : [],
          unchecked: isChecked ? [] : ids,
          isBundle: false,
        });
        refetch();
      } catch (err) {
        console.log(err);
      }
      setChecked(isChecked ? ids : []);
      setUnChecked(isChecked ? [] : ids);
    }
  };

  const handleDelete = async (pd: CartItem) => {
    setDeleteLoading(true);
    try {
      await api.delete(`/cart/delete/${pd?.id}`);
      toast.success('Cart Remove SuccessfullY');
      refetchProfile();
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ['cart'] });
      }, 500);
      // await queryClient.refetchQueries({ queryKey: ['cart'] });
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
    setDeleteLoading(false);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };


  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
      <div className="py-3.5 px-4 sm:px-6 flex items-center justify-between">
        <h5 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-700">
          My Cart
        </h5>
        <div className="flex items-center gap-x-2 xs:gap-x-3">
          {/* <Button
            disabled
            outlined
            // onClick={handleDeleteSelected}
            className="h-8 sm:h-9 w-20 sm:w-[90px] md:w-[100px] py-0 flex items-center gap-x-2.5 border-[#EAECF0] text-xs md:!text-sm font-semibold"
          >
            <FiTrash2 className="text-lg md:text-xl" /> Delete
          </Button> */}
          <Button
            onClick={handleCheckout}
            disabled={checked.length < 1}
            className="h-8 md:h-10 w-28 xs:w-32 sm:w-[140px] md:w-[169px] py-0 flex gap-x-1 sm:gap-x-2 px-0 items-center justify-center text-xs md:!text-sm"
          >
            <IoCheckmark className="hidden xs:block text-base" /> Proceed
            Order&apos;s
          </Button>
        </div>
      </div>
      {/* table  */}
      <div className="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[630px]">
            <thead>
              <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
                <th className="pl-6 py-3.5 w-20 pr-2">
                  <CheckBox
                    checked={unChecked.length === 0}
                    onChange={(checked) => handleSelectAll(checked)}
                  />
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-20 pr-2">
                  Action
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-20 pr-2">
                  Image
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 pr-2">
                  Product Name
                </th>
                {/* <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%] pr-2">
                  Submit Date
                </th> */}
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-20 pr-2">
                  Quantity
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-20 pr-2">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(5)
                    .fill(' ')
                    .map((_, i) => (
                      <tr
                        key={i}
                        className="bg-gray-200 animate-pulse border-b border-white"
                      >
                        {Array(6)
                          .fill(' ')
                          .map((_, i) => (
                            <td key={i} className="h-10 tab " />
                          ))}
                      </tr>
                    ))
                : cart?.data?.map((pd: any) => (
                    <Row
                      key={pd.id}
                      onChange={() => handleChecked(pd?.id, pd)}
                      onDelete={() => handleDelete(pd)}
                      pd={pd}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        {!isLoading && !cart?.data?.length && (
          <p className="text-center py-3 h-[20vh] flex items-center justify-center">
            No Cart found
          </p>
        )}
        <div className="flex items-center justify-between py-3.5 px-4 md:px-6">
          <p className="text-xs text-neutral-500 flex-1">
            Total Items:{' '}
            <span className="font-semibold">{cart?.data?.length}</span>
          </p>
          <div className="flex items-center justify-between gap-x-3 xs:w-6/12 lg:w-4/12">
            <button
              disabled={!cart?.data?.length || isLoading}
              className="size-6 sm:size-8 lg:size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center"
            >
              <FaAngleLeft className="text-sm sm:text-lg" />
            </button>
            <p className="text-xs sm:text-sm text-center text-neutral-500">
              Page 1 of 1
            </p>
            <button
              disabled={!cart?.data?.length || isLoading}
              className="size-6 sm:size-8 lg:size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center"
            >
              <FaAngleRight className="text-sm sm:text-lg" />
            </button>
          </div>
        </div>
      </div>
      {/* checkout modal  */}
      <Modal
        show={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        panelClassName="w-[780px] px-0"
      >
        <div className="flex items-center justify-between pb-4 px-4">
          <p className="text-black text-sm font-bold">Order&apos;s</p>
          <button onClick={() => setCheckoutOpen(false)}>
            <IoMdClose className="text-xl lg:text-2xl" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[530px]">
            <thead className="border-b border-neutral-200">
              <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[40%] pl-6">
                  Product Name
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                  Submit Date
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                  Quantity
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-4 w-[40%] pl-6">
                  <p className="text-xs text-success">Business Card</p>
                  <p className="text-sm text-neutral-600 font-semibold">
                    350 Gsm Matt Lamination
                  </p>
                </td>
                <td className="py-4 w-[20%]">
                  <p className="text-[13px]/[19px] text-neutral-500 uppercase">
                    02 SEP 2023
                  </p>
                  <p className="text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                    21:13
                  </p>
                </td>
                <td className="py-4 text-neutral-500 text-sm w-[20%]">1000</td>
                <td className="py-4 text-neutral-500 text-sm w-[20%]">
                  150.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-4 md:px-6 py-3.5 flex flex-col xs:flex-row gap-y-4 xs:gap-y-0 xs:gap-x-4 justify-end">
          <div className=" xs:w-[210px] sm:w-[279px] h-9 md:h-10 flex items-center justify-between gap-x-2 border border-[#C3C4FE] py-3 px-4 rounded-lg">
            <p className="text-tiny sm:text-xs text-neutral-800 font-semibold">
              Estimated (Exc. Vat)
            </p>
            <h5 className="text-primary font-semibold sm:font-bold text-xs sm:text-sm md:text-base">
              300.00 AED
            </h5>
          </div>
          <Button
            onClick={() => {
              setCheckoutOpen(false);
              router.push('/checkout');
            }}
            className="h-9 lg:h-11 flex-1 xs:max-w-48 flex gap-x-1 md:gap-x-2 px-0 items-center justify-center text-xs md:text-sm lg:text-sm"
          >
            <IoCheckmark className="text-base" /> Proceed to Checkout
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;

const Row = ({
  onChange,
  onDelete,
  pd,
}: {
  onChange: () => void;
  onDelete: () => void;
  pd: any;
}) => {
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <tr
        onClick={onChange}
        className="border-b border-neutral-200 cursor-pointer"
      >
        <td className="py-4 pl-6 pr-2">
          <CheckBox checked={Number(pd?.selected) === 1} />
        </td>
        <td className="py-4 flex pr-2 items-center gap-x-2">
          <button
            disabled={isDeleteLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="size-8 md:size-10 bg-neutral-100 text-[#475467] transition-all duration-300 hover:bg-red-100 hover:text-red-600 rounded-lg flex items-center justify-center"
          >
            {!isDeleteLoading ? (
              <FiTrash2 />
            ) : (
              <FiLoader className="animate-spin" />
            )}
          </button>
          {/* <button
            onClick={() => setPreviewOpen(true)}
            className="size-8 md:size-10 bg-neutral-100 hover:bg-neutral-300 rounded-lg flex items-center justify-center transition-all duration-300"
          >
            <FileSearch />
          </button> */}
        </td>
        <td className="overflow-hidden pr-2">
          <Image
            src={config.imgUri + pd?.flash_product?.image}
            alt={pd?.flash_product?.image}
            width={40}
            height={30}
            className="overflow-hidden object-cover bg-gray-200 text-sm"
          />
        </td>
        <td className="py-4 overflow-hidden pr-2">
          <div className="max-w-[200px] overflow-hidden">
            <p
              // href={`/cart/${pd?.flash_product?.slug}/${pd?.flash_product?.id}`}
              className="text-sm text-neutral-600 font-semibold whitespace-nowrap text-ellipsis"
            >
              {pd?.flash_product?.title}
            </p>
          </div>
        </td>
        <td className="py-4 text-neutral-500 text-sm pr-2">{pd?.quantity}</td>
        <td className="py-4 text-neutral-500 text-sm pr-2">
          {pd?.flash_product?.offered ??
            pd?.flash_product?.selling * Number(pd?.quantity ?? '0')}
        </td>
      </tr>
    </>
  );
};
