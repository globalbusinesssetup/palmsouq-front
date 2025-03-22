'use client';
import { File, Tag } from '@/components';
import React, { useEffect, useState } from 'react';
import { StatusTypes } from '@/components/common/Tag';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCountries, getOrder, getPayMethods } from '@/utils/api';
import { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { usePDF } from 'react-to-pdf';
import Invoice from '@/components/Invoice';
import Payment from '@/app/(default)/checkout/Payment';
import { paymentEncrypt } from '@/utils/helper';
import { getCurrentStatus } from '@/app/(dashboard)/dashboard/orders/page';
import OrderDetails from './OrderDetails';
import PaymentMethods from './PaymentMethods';
import CancelOrder from './CancelOrder';

const Order = ({
  order,
  i,
  refetch,
}: {
  order: any;
  i: number;
  refetch: () => void;
}) => {
  const [isOpen, setOpen] = useState(false);
  const {
    data: orderData,
    isLoading: isOrderDataLoading,
    refetch: refetchOrder,
    isRefetching,
  } = useQuery({
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
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
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
  const queryClient = useQueryClient();

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
      <OrderDetails
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        order={order}
        status={status}
        orderData={orderData}
        onCancel={() => {
          setOpen(false);
          setCancelModalOpen(true);
        }}
        onPayNow={() => {
          setOpen(false);
          setIsPayMethodOpen(true);
        }}
        onInvoice={() => toPDF()}
        refetchOrder={refetchOrder}
        isOrderDataLoading={isOrderDataLoading}
        isRefetching={isRefetching}
      />
      {/* Select payment method  */}
      <PaymentMethods
        isVisible={isPayMethodOpen}
        onClose={() => setIsPayMethodOpen(false)}
        payData={payData}
        orderMethod={orderMethod}
        isSubmitting={isSubmitting}
        handleConfirm={handleConfirm}
        order={order}
        onMethodChange={setMethod}
      />
      {/* Payment  */}
      <Payment
        order={{ ...order, name: orderData?.address?.name }}
        isOpen={isPayOpen}
        onClose={() => setPayOpen(false)}
        onSuccess={handlePaySuccess}
      />
      {/* Cancel modal  */}
      <CancelOrder
        isVisible={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        order={order}
      />
    </>
  );
};
export default Order;
