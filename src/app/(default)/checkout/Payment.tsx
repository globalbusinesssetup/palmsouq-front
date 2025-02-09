import { Modal } from '@/components';
import { getPayMethods } from '@/utils/api';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import StripePay from './StripePay';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { IoMdClose } from 'react-icons/io';

const Payment = ({
  onSuccess,
  order,
  isOpen,
  onClose,
  isCheckout = false,
}: {
  onSuccess: () => void;
  onClose: () => void;
  isOpen: boolean;
  order: any;
  isCheckout?: boolean;
}) => {
  const { data: payData, isLoading } = useQuery({
    queryKey: ['payMethods'],
    queryFn: getPayMethods,
  });
  const stripePromise = loadStripe(payData?.stripe_key!);
  return (
    <Modal show={isOpen} onClose={onClose} panelClassName={'max-w-[350px]'}>
      <div
        aria-disabled={isLoading}
        className={`min-h-60 relative ${
          isLoading ? 'aria-disabled:opacity-75' : ''
        }`}
      >
        {!isCheckout && (
          <button
            className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-100"
            onClick={onClose}
          >
            <IoMdClose className="text-sm text-primary/80" />
          </button>
        )}
        <Elements stripe={stripePromise}>
          <StripePay
            payData={{ ...order, amount: order?.total_amount }}
            onSuccess={onSuccess}
          />
        </Elements>
      </div>
    </Modal>
  );
};

export default Payment;
