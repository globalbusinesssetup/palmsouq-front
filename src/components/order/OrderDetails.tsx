import { Button, File, Modal, Tag, Image } from '@/components';
import React from 'react';
import { FaCreditCard } from 'react-icons/fa6';
import { FiCalendar, FiDownload } from 'react-icons/fi';
import { BiMessageDots } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import OrderStep from '@/app/(default)/order/OrderStep';
import {
  getCurrentStatus,
  steps,
} from '@/app/(dashboard)/dashboard/orders/page';

const OrderDetails = ({
  isOpen,
  onClose,
  order,
  orderData,
  onCancel,
  onPayNow,
  status,
  onInvoice,
  refetchOrder,
  isOrderDataLoading,
  isRefetching,
}) => {
  console.table(orderData);
  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="flex md:hidden items-center justify-end pb-3 -mt-1">
        <button onClick={onClose}>
          <IoMdClose className="text-xl" />
        </button>
      </div>
      {isOrderDataLoading || isRefetching ? (
        <div className="h-[442px] flex items-center justify-center">
          Loading...
        </div>
      ) : orderData?.form ? (
        <div className="h-[442px] flex flex-col items-center justify-center text-error">
          Failed to get order data
          <Button
            onClick={refetchOrder}
            className="mt-2 w-fit px-3 py-2 lg:text-sm"
          >
            Refresh
          </Button>
        </div>
      ) : isOpen && orderData ? (
        <div className="px-[18px] py-4 border border-neutral-300 rounded-xl">
          <div className="flex justify-between">
            <div className="">
              <div className="flex-1 flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-6">
                <h5 className="text-black font-semibold text-xs xs:text-sm sm:text-base md:text-lg">
                  Order Status
                </h5>
                <Tag
                  status={
                    order?.cancelled == 1 || order.status == '6'
                      ? 'cancelled'
                      : getCurrentStatus(order?.status)
                  }
                />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-y-0 sm:gap-x-2.5 mt-2 md:mt-3">
                <div className="flex items-center gap-x-2.5">
                  <File />
                  <p className="text-tiny sm:text-xs font-light text-neutral-500">
                    {order?.order}
                  </p>
                </div>
                <div className="flex items-center gap-x-2.5">
                  <FiCalendar className="text-base text-neutral-400" />
                  <p className="text-tiny sm:text-xs font-light text-neutral-500">
                    {order?.created}
                  </p>
                </div>
              </div>
              {order.status == '6' && (
                <p className="text-tiny sm:text-xs font-light text-error mt-3">
                  Order Cancelled by Palmsouq
                </p>
              )}
              {/* <div className="mt-3 hidden md:block">
                <p className="text-sm text-neutral-500 ">
                  <span className="font-bold">Order method</span> :{' '}
                  {order?.order_method === '2' ? 'COD' : 'Stripe'}
                </p>
                {order?.order_method !== '2' && (
                  <p className="text-sm text-neutral-500 mt-2">
                    <span className="font-bold">Payment status</span> :{' '}
                    {order?.payment_done === 0 ? 'Unpaid' : 'Paid'}
                  </p>
                )}
              </div> */}
            </div>
            <div
              aria-disabled={order?.cancelled === 1 || order.status === '6'}
              className="flex flex-col items-end aria-disabled:opacity-40"
            >
              <div className="mb-3 md:hidden">
                <p className="text-xs text-neutral-500 ">
                  <span className="font-bold">Order method</span> :{' '}
                  {order?.order_method === '2' ? 'COD' : 'Stripe'}
                </p>
                {order?.order_method !== '2' && (
                  <p className="text-xs text-neutral-500 mt-2">
                    <span className="font-bold">Payment status</span> :{' '}
                    {order?.payment_done === 0 ? 'Unpaid' : 'Paid'}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                {order.order_method !== '2' && order.payment_done === 0 && (
                  <Button
                    onClick={onPayNow}
                    className="sm:w-[115px] py-0 h-8 sm:h-9 !text-xs sm:!text-sm font-semibold flex items-center justify-center gap-x-2"
                  >
                    <FaCreditCard className="text-base sm:text-lg md:text-xl" />
                    Pay now
                  </Button>
                )}
                {order.status == '1' ? (
                  <Button
                    outlined
                    disabled={order?.cancelled === 1 || order.status === '6'}
                    onClick={onCancel}
                    className="w-32 sm:w-[146px] border-[#FDA29B] !text-xs md:!text-sm font-semibold text-error hover:text-error hover:scale-90 hover:bg-transparent flex items-center justify-center gap-x-2.5"
                  >
                    <File varient="FileClose" className="size-4 md:size-5" />{' '}
                    Cancel Order
                  </Button>
                ) : (
                  <Button
                    onClick={onInvoice}
                    className="w-[90px] sm:w-[105px] py-0 h-8 sm:h-9 text-xs sm:text-sm font-semibold flex items-center justify-center gap-x-2"
                  >
                    <FiDownload className="text-base sm:text-lg md:text-xl" />
                    Invoice
                  </Button>
                )}
              </div>
              {order.status === '1' && (
                <div className="flex items-center gap-x-2.5 mt-2">
                  <p className="text-tiny md:text-xs font-light text-right text-neutral-500">
                    Cancel the order pre-production
                  </p>
                  <BiMessageDots className="text-xs sm:text-base text-black" />
                </div>
              )}
            </div>
          </div>
          <div
            aria-disabled={order.cancelled === 1}
            className="flex flex-col sm:flex-row sm:items-center justify-center pt-6 lg:pt-10 pb-4 aria-disabled:opacity-45"
          >
            {steps.map((step, i) => (
              <OrderStep
                key={`step_${i}`}
                index={i}
                lastIndex={steps.length - 1}
                title={step.title}
                status={status}
              />
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between bg-[#F9FAFB] py-2">
              <p className="text-xs md:text-sm">Product</p>
              <div className="flex items-center gap-x-2">
                <p className="w-[70px] text-xs md:text-sm">Quantity</p>
                <p className="w-[70px] text-xs md:text-sm text-right pr-2">
                  Amount
                </p>
              </div>
            </div>
            <div className="space-y-3 mt-4 divide-y">
              {order?.ordered_products?.map((pd, i) => (
                <div
                  key={`product_${i}`}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-x-2">
                    <div className="relative w-10 h-10 xs:w-[60px] xs:h-[50px]">
                      <Image
                        fill
                        defaultSrc={pd?.product?.image}
                        className="object-contain"
                        alt="product"
                      />
                    </div>
                    <p className="w-[70px] xs:w-auto overflow-hidden text-ellipsis text-nowrap md:text-wrap text-xs lg:text-sm">
                      {pd?.product?.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <p className="w-[70px] text-ellipsis text-center text-xs lg:text-sm">
                      {pd?.quantity}
                    </p>
                    <p className="w-[70px] text-ellipsis text-center text-xs lg:text-sm">
                      {pd?.product?.offered ?? pd?.product?.selling}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-neutral-300/50 pt-2">
              <div className="">
                <p className="text-xs md:text-sm text-neutral-500 text-right">
                  <span className="inline-block uppercase font-bold text-primary">
                    Order method :
                  </span>
                  <span className="w-[100px] inline-block">
                    {order?.order_method === '2' ? 'COD' : 'Stripe'}
                  </span>
                </p>
                {order?.order_method !== '2' && (
                  <p className="text-xs md:text-sm text-neutral-500 mt-3 text-right">
                    <span className="inline-block uppercase font-bold text-primary">
                      Payment status :
                    </span>
                    <span className="w-[100px] inline-block ">
                      {order?.payment_done === 0 ? 'Unpaid' : 'Paid'}
                    </span>
                  </p>
                )}
              </div>
              <div className="">
                <p className="text-xs md:text-sm text-neutral-500 mt-3 text-right">
                  <span className="inline-block uppercase font-bold text-primary">
                    Shipping charge :
                  </span>
                  <span className="w-[100px] inline-block ">
                    {order?.shipping_price > 0
                      ? order?.shipping_price + 'AED'
                      : 'Free'}
                  </span>
                </p>
                <p className="text-xs md:text-sm text-neutral-500 mt-3 text-right">
                  <span className="inline-block uppercase font-bold text-primary">
                    Total Order amount :
                  </span>
                  <span className="w-[100px] inline-block ">
                    {order?.total_amount} AED
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default OrderDetails;
