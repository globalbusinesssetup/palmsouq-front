'use client';
import { Button, File, Input, Modal, Tag, Image, Avatar } from '@/components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCreditCard,
  FaHandshake,
} from 'react-icons/fa6';
import { FiCalendar, FiDownload } from 'react-icons/fi';
import { BiMessageDots } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { StatusTypes } from '@/components/common/Tag';
import OrderStep from '@/app/(default)/order/OrderStep';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCountries, getOrder, getOrders, getPayMethods } from '@/utils/api';
import { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { usePDF } from 'react-to-pdf';
import Invoice from '@/components/Invoice';
import Payment from '@/app/(default)/checkout/Payment';
import config from '@/config';
import { paymentIcons } from '@/constants';
import { paymentEncrypt } from '@/utils/helper';

export const steps = [
  { title: 'Pending', icon: '/icons/check.svg' },
  { title: 'Confirmed', icon: '/icons/check.svg' },
  { title: 'Picked up', icon: '/icons/check.svg' },
  { title: 'on the way', icon: '/icons/check.svg' },
  { title: 'Delivered', icon: '/icons/check.svg' },
];

export const getCurrentStatus = (status: string) => {
  let currentStatus: StatusTypes = 'pending';
  switch (status) {
    case '1':
      currentStatus = 'pending';
      break;
    case '2':
      currentStatus = 'confirmed';
      break;
    case '3':
      currentStatus = 'picked_up';
      break;
    case '4':
      currentStatus = 'on_the_way';
      break;
    case '5':
      currentStatus = 'delivered';
      break;
  }
  return currentStatus;
};

const Orders = () => {
  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden max-w-7xl">
      <div className="py-3 lg:py-3.5 px-4 lg:px-6 flex items-center justify-between gap-x-2">
        <h5 className="text-sm sm:text-base lg:text-lg whitespace-nowrap font-semibold text-neutral-700">
          My Order&apos;s
        </h5>
      </div>
      <div className="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
                <th className="text-xs font-semibold text-[#667085] py-3.5 pl-6"></th>
                <th className="text-xs font-semibold text-[#667085] py-3.5">
                  Order No.
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5">
                  Product Name
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5">
                  Payment Method
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5">
                  Quantity
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5">
                  Amount
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {isOrdersLoading
                ? Array(5)
                    .fill(' ')
                    .map((_, i) => (
                      <tr
                        key={i}
                        className="bg-gray-200 animate-pulse border-b border-white"
                      >
                        {Array(7)
                          .fill(' ')
                          .map((_, i) => (
                            <td key={i} className="h-10 tab " />
                          ))}
                      </tr>
                    ))
                : orders?.data?.data?.length! > 0 &&
                  orders?.data?.data.map((order: any, i: number) => (
                    <Row
                      key={order?.id}
                      order={order}
                      i={i}
                      refetch={refetch}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        {!isOrdersLoading && !orders?.data?.data?.length && (
          <p className="text-center py-3 h-[20vh] flex items-center justify-center">
            No Order found
          </p>
        )}
        <div className="flex items-center justify-between py-3.5 px-6">
          <p className="text-xs text-neutral-500 flex-1">
            Total Items:{' '}
            <span className="font-semibold">{orders?.data?.data.length}</span>
          </p>
          <div className="flex items-center justify-between gap-x-3 xs:w-6/12 lg:w-4/12">
            <button
              disabled={isOrdersLoading || !orders?.data?.data?.length}
              className="size-6 sm:size-8 lg:size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center"
            >
              <FaAngleLeft className="text-sm sm:text-lg" />
            </button>
            <p className="text-xs sm:text-sm text-center text-neutral-500">
              Page {orders?.data?.current_page} of {orders?.data?.last_page}
            </p>
            <button
              disabled={isOrdersLoading || !orders?.data?.data?.length}
              className="size-6 sm:size-8 lg:size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center"
            >
              <FaAngleRight className="text-sm sm:text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

const Row = ({
  order,
  i,
  refetch,
}: {
  order: any;
  i: number;
  refetch: () => void;
}) => {
  const [isOpen, setOpen] = useState(false);
  const { data: orderData, isLoading } = useQuery({
    queryKey: ['order', order?.id],
    queryFn: () => getOrder(order?.id),
    enabled: isOpen,
  });
  const { data: countriesPhones, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['countries-phones'],
    queryFn: getCountries,
  });
  const { data: payData, isLoading: isPayDataLoading } = useQuery({
    queryKey: ['payMethods'],
    queryFn: getPayMethods,
  });
  const [isPayMethodOpen, setIsPayMethodOpen] = useState(false);
  const [isPayOpen, setPayOpen] = useState(false);
  const [isFilePreviewOpen, setFilePreviewOpen] = useState(false);
  const [orderMethod, setMethod] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusTypes>(
    order?.cancelled === 1 || order.status === '6'
      ? 'cancelled'
      : getCurrentStatus(order?.status)
  );
  const { toPDF, targetRef } = usePDF({
    filename: `Invoice-${order.order}.pdf`,
  });
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<{ title: string; message: string }>({
    defaultValues: {
      title: '',
      message: '',
    },
  });

  const handleCancel = async (data: { title: string; message: string }) => {
    setIsCancelLoading(true);
    try {
      const res = await api.post(`/cancellation/cancel-order`, {
        order_id: order?.id,
        title: data?.title,
        message: data?.message,
        user_token: Cookies.get('user_token'),
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        toast.success('Order cancelled successfully');
        await queryClient.invalidateQueries({ queryKey: ['orders'] });
        await queryClient.refetchQueries({ queryKey: ['orders'] });
        reset();
        setFilePreviewOpen(false);
      }
    } catch (err) {
      toast.error('Error to cancel order');
      console.log('err =>', err);
    } finally {
      setIsCancelLoading(false);
    }
  };

  const handleConfirm = async () => {
    const token = Cookies.get('user_token');
    if (orderMethod === 2) {
      setSubmitting(true);
      try {
        const paymentData = paymentEncrypt({
          id: order?.id,
          payment_token: '',
          order_method: orderMethod,
          user_token: token!,
        });
        const res = await api.post('order/payment-done', {
          data: paymentData,
        });
        if (res?.data.message) {
          console.log(res?.data?.data?.form[0]);
          toast.error(res?.data?.data?.form[0]);
          setSubmitting(false);
          return;
        }
        refetch();
        setSubmitting(false);
        setIsPayMethodOpen(false);
      } catch (error) {}
    } else {
      setIsPayMethodOpen(false);
      setPayOpen(true);
    }
  };

  const handlePaySuccess = () => {
    setPayOpen(false);
    queryClient.invalidateQueries({ queryKey: ['orders', 'order'] });
    queryClient.refetchQueries({ queryKey: ['orders', 'order'] });
    toast.success('Payment done Successfully!');
  };

  useEffect(() => {
    if (!isPayDataLoading) {
      setMethod(payData?.default!);
    }
  }, [payData, isPayDataLoading]);

  return (
    <>
      <tr key={`table_${i}`} className="border-b border-neutral-200">
        <td className="py-4 pl-6">
          <button onClick={() => setOpen(true)}>
            <File varient="FileClock" />
          </button>
        </td>
        <td className="py-4 text-neutral-500 text-xs lg:text-sm">
          {order?.order}
        </td>
        <td className="py-4 w-[30%]">
          <div className="max-w-[150px] lg:max-w-[200px] overflow-hidden">
            {/* <p className="text-tiny lg:text-xs text-success">Business Card</p> */}
            <p className="text-xs lg:text-sm text-neutral-600 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {order?.ordered_products[0]?.product?.title}
            </p>
          </div>
        </td>
        <td className="py-4 w-[20%]">
          {/* <p className="text-xs lg:text-[13px]/[19px] text-neutral-500 uppercase">
            {order?.order_method === '2' ? 'COD' : 'Stripe'}
          </p> */}
          <p className="text-xs lg:text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
            {order?.order_method === '2' ? 'COD' : 'Stripe'}
          </p>
        </td>
        <td className="py-4 text-neutral-500 text-xs lg:text-sm">
          {order?.ordered_products[0]?.quantity}
        </td>
        <td className="py-4 text-neutral-500 text-xs lg:text-sm">
          {order?.total_amount}
        </td>
        <td className="py-4 space-y-2">
          <div className="relative group">
            <Tag
              status={
                order?.cancelled === 1 || order.status === '6'
                  ? 'cancelled'
                  : order.order_method !== '2' && order.payment_done === 0
                  ? 'unpaid'
                  : getCurrentStatus(order?.status)
              }
            />
            {order.order_method !== '2' && order.payment_done === 0 && (
              <div className="absolute w-[100px] text-center left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-black/50 text-white text-[9px] px-1 py-1 rounded">
                Waiting for payment
              </div>
            )}
          </div>
          {order.order_method !== '2' && order.payment_done === 0 && (
            <button
              onClick={() => setIsPayMethodOpen(true)}
              className="text-xs underline text-green ml-2"
            >
              Pay now
            </button>
          )}
        </td>
      </tr>
      {isOpen && orderData && (
        <Invoice
          key={i}
          ref={targetRef}
          isFreeShipping
          isVendor={false}
          order={order}
          address={orderData.address}
          countries={countriesPhones?.countries}
          subtotalPrice={orderData?.calculated?.subtotal ?? 'N/A'}
          totalPrice={orderData?.calculated?.total_price ?? 'N/A'}
          shippingPrice={orderData?.calculated?.shipping_price ?? 'N/A'}
          taxPrice={orderData?.calculated?.tax ?? 'N/A'}
        />
      )}
      {/* Order Details  */}
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <div className="flex md:hidden items-center justify-end pb-3 -mt-1">
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="text-xl" />
          </button>
        </div>
        {isOpen && orderData ? (
          <div className="px-[18px] py-4 border border-neutral-300 rounded-xl">
            <div className="flex justify-between">
              <div className="">
                <div className="flex-1 flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-6">
                  <h5 className="text-black font-semibold text-xs xs:text-sm sm:text-base md:text-lg">
                    Order Status
                  </h5>
                  <Tag
                    status={
                      order?.cancelled === 1 || order.status === '6'
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
                {order.status === '6' && (
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
                      onClick={() => {
                        setOpen(false);
                        setPayOpen(true);
                      }}
                      className="sm:w-[115px] py-0 h-8 sm:h-9 !text-xs sm:!text-sm font-semibold flex items-center justify-center gap-x-2"
                    >
                      <FaCreditCard className="text-base sm:text-lg md:text-xl" />
                      Pay now
                    </Button>
                  )}
                  {order.status === '1' ? (
                    <Button
                      outlined
                      disabled={order?.cancelled === 1 || order.status === '6'}
                      onClick={() => {
                        setOpen(false);
                        setFilePreviewOpen(true);
                      }}
                      className="w-32 sm:w-[146px] border-[#FDA29B] !text-xs md:!text-sm font-semibold text-error hover:text-error hover:scale-90 hover:bg-transparent flex items-center justify-center gap-x-2.5"
                    >
                      <File varient="FileClose" className="size-4 md:size-5" />{' '}
                      Cancel Order
                    </Button>
                  ) : (
                    <Button
                      onClick={() => toPDF()}
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
                      <p className="text-ellipsis w-[70px] xs:w-auto overflow-hidden text-nowrap text-xs lg:text-sm">
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
              <div className="mt-3">
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
                <p className="text-xs md:text-sm text-neutral-500 mt-3 text-right">
                  <span className="inline-block uppercase font-bold text-primary">
                    Order amount :
                  </span>
                  <span className="w-[100px] inline-block ">
                    {order?.total_amount} AED
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[442px] flex items-center justify-center">
            Loading...
          </div>
        )}
      </Modal>
      {/* Select payment method  */}
      <Modal
        show={isPayMethodOpen}
        onClose={() => setIsPayMethodOpen(false)}
        panelClassName={'max-w-[500px]'}
      >
        <div className="flex items-center justify-between">
          <p className="text-black text-base font-bold">
            Select Payment Method
          </p>
          <button
            onClick={() => setIsPayMethodOpen(false)}
            className=" rounded-full bg-gray-100 p-1"
          >
            <IoMdClose className="text-lg text-black" />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-0 sm:max-w-[506px]">
          <button
            disabled={payData?.stripe! === 0}
            onClick={() => setMethod(3)}
            className={`cursor-pointer px-4 py-4 border rounded-lg flex-1 ${
              orderMethod === 3 ? 'border-[#9B9DFD]' : 'border-neutral-300'
            }`}
          >
            <p className="text-sm font-semibold text-neutral-800">
              Pay with Card
            </p>
            <div className="flex items-center justify-center mt-2 gap-x-2 px-3 py-2 bg-neutral-100">
              {paymentIcons.map((icon, i) => (
                <Image
                  key={i}
                  isLocal
                  defaultSrc={icon}
                  width={30}
                  height={22}
                  className="rounded"
                  alt="payment icon"
                />
              ))}
            </div>
            <p className="text-xs text-neutral-400 mt-4">Secure Payment</p>
            <p className="text-xs text-neutral-500 font-medium">
              Powered by{' '}
              <span className="font-semibold text-neutral-800">Stripe</span>.
            </p>
          </button>
          <button
            disabled={payData?.cash_on_delivery! === 0}
            onClick={() => setMethod(2)}
            className={`cursor-pointer p-6 border rounded-lg flex-1 h-full flex flex-col items-center justify-center ${
              orderMethod === 2 ? 'border-[#9B9DFD]' : 'border-neutral-300'
            }`}
          >
            <Avatar className="bg-neutral-50 mx-auto size-9">
              <FaHandshake className="text-[#344054] text-lg" />
            </Avatar>
            <h5 className="mt-2 text-sm font-semibold text-neutral-800">COD</h5>
            <p className="text-xs text-neutral-400 mt-6">
              <span className="text-primary font-semibold">
                Cash on delivery
              </span>
            </p>
          </button>
        </div>
        <div className="mt-5 flex justify-end">
          <Button loading={isSubmitting} onClick={handleConfirm}>
            {orderMethod === 3
              ? `Confirm & Pay now ${order?.total_amount}`
              : 'Confirm order'}
          </Button>
        </div>
      </Modal>
      {/* Payment  */}
      <Payment
        order={{ ...order, name: orderData?.address?.name }}
        isOpen={isPayOpen}
        onClose={() => setPayOpen(false)}
        onSuccess={handlePaySuccess}
      />
      {/* Cancel modal  */}
      <Modal
        show={isFilePreviewOpen}
        panelClassName="p-0 max-w-[400px]"
        onClose={() => {
          clearErrors();
          setFilePreviewOpen(false);
        }}
      >
        <div className="flex items-center justify-between bg-primary px-6 py-3">
          <p className="text-white text-sm font-bold">Cancel Order</p>
          <button
            onClick={() => {
              clearErrors();
              setFilePreviewOpen(false);
            }}
          >
            <IoMdClose className="text-2xl text-white" />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleCancel)} className="px-4 py-4">
          <Input
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            label="Title"
            error={errors.title}
          />
          <div className="mt-2 mb-4">
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              id="message"
              rows={4}
              className="border rounded-lg w-full focus-visible:outline-neutral-300 pl-3.5 pr-[38px] py-2.5 mt-2 text-[#667085]"
            />
            <p
              className={`text-red-500 text-xs mt-0.5 ml-0.5 min-h-4 ${
                errors.message ? 'visible' : 'invisible'
              } `}
            >
              {errors.message?.message}
            </p>
          </div>
          <Button loading={isCancelLoading} type="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};
