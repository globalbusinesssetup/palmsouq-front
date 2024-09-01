import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { Button } from '@/components';
import { api } from '@/utils/fetcher';

const StripePay = ({ payData }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const token = Cookies.get('token');

  const stripePay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError?.message!);
      return;
    }

    const clientSecret = payData?.stripe_secret!;
    
    try {
      const res = await stripe?.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: '/checkout?currentStep=2',
        },
      });
      if (res?.error) {
        toast.error(res?.error.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
    const res = await api.post('order/action', {
      data: token,
    });
    console.log('order res =>', res);
  };
  return (
    <form onSubmit={stripePay}>
      <div className="min-h-[230px]">
        <PaymentElement
          options={{
            business: { name: 'Printcraft' },
          }}
        />
      </div>
      <Button className="mt-4" type="submit" disabled={!stripe || !elements}>
        Pay
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default StripePay;
