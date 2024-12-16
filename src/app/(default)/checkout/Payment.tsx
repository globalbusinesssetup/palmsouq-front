import { Modal } from '@/components';
import { getPayMethods } from '@/utils/api';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import StripePay from './StripePay';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';

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
        className={`min-h-60 ${isLoading ? 'aria-disabled:opacity-75' : ''}`}
      >
        <Elements stripe={stripePromise}>
          <StripePay payData={order} onSuccess={onSuccess} />
        </Elements>
      </div>
    </Modal>
  );
};

export default Payment;
