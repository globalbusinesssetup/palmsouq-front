'use client';
import { Button } from '@/components';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa6';
import OrderStep from '../order/OrderStep';
import {
  getCurrentStatus,
  steps,
} from '@/app/(dashboard)/dashboard/orders/page';
import { StatusTypes } from '@/components/common/Tag';
import { api } from '@/utils/fetcher';
import dayjs from 'dayjs';

const TrackOrderClient = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<StatusTypes>(
    order?.cancelled === 1 ? 'cancelled' : getCurrentStatus(order?.status)
  );

  const handleTrackOrder = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/track-order?tracking_id=${orderId}`);
      setOrder(res?.data?.data);
      setStatus(
        res?.data?.cancelled === 1
          ? 'cancelled'
          : getCurrentStatus(res?.data?.data?.status)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="container mx-auto pt-16 lg:flex gap-x-5 min-h-[calc(100vh-97px)]">
      <div className="flex-1 px-4 pb-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-primary">
          Track your order
        </h1>
        <p className="mt-3 text-sm lg:text-base text-gray-600">
          Have an order? Want to know where your order is now?
        </p>
        <div className="border rounded-lg xl:max-w-[70%] p-6 lg:p-10 mt-8">
          <h5 className="text-lg font-semibold text-primary">
            Enter the track code of your order
          </h5>
          <label
            htmlFor="order"
            className="mt-4 text-sm font-bold inline-block"
          >
            Order
          </label>
          <div className="border rounded-lg mt-3 overflow-hidden flex items-center gap-x-3 px-3.5">
            <FaBox size={18} color="gray" />
            <input
              id="order"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Your Order. eg.20141412hpe0q20"
              className="h-11 flex-1 w-full focus-visible:outline-none py-2.5 text-[#667085] rounded-lg text-sm"
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Know the progress of your product delivery.
          </p>
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleTrackOrder}
              loading={isLoading}
              disabled={!orderId}
              className="h-11 w-[144px]"
            >
              Submit
            </Button>
          </div>
        </div>
        {order && (
          <div className="mt-8">
            <h4 className="text-xl text-primary font-semibold">
              Status of the Order
            </h4>
            <div
              aria-disabled={order?.cancelled === 1}
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
            <div className="mt-6 border-t border-gray-300 pt-6">
              <h5 className="text-xl text-primary font-semibold">
                Estimated delivery
              </h5>
              <p className="text-gray-600 mt-4 font-semibold">
                <span className="text-primary">Estimated:</span>{' '}
                {/* {`${order?.created_at.slice(0, 8)}${
                  Number(order?.created_at.slice(8, 10)) +
                  Number(
                    order?.ordered_products?.[0]?.shipping_place?.day_needed
                  )
                }`} */}
                {dayjs(order?.created_at, 'YYYYMMDD')
                  .add(
                    Number(
                      order?.ordered_products?.[0]?.shipping_place?.day_needed
                    ),
                    'day'
                  )
                  .format('DD-MM-YYYY')}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:block flex-1 w-full max-h-[40vh] relative">
        <Image
          fill
          src="/banners/track-order.png"
          alt="track order"
          className="object-contain"
        />
      </div>
    </main>
  );
};

export default TrackOrderClient;
