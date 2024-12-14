import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { Button } from '@/components';
import { api } from '@/utils/fetcher';
import { paymentEncrypt } from '@/utils/helper';

const StripePay = ({
  payData,
  onSuccess,
}: {
  payData: any;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setSubmitting] = useState(false);

  const stripePay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    console.log('payData =>', payData);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError?.message!);
      setSubmitting(false);
      return;
    }
    setErrorMessage(undefined);

    const cardElement = elements.getElement(CardNumberElement);
    // Create a token
    const result = await stripe.createToken(cardElement!, {
      name: payData.name,
      currency: payData.currency,
    });

    if (result.error) {
      toast.error(result.error.message);
      setErrorMessage(result.error.message);
      setSubmitting(false);
    } else {
      // Simulate sending the token to the backend
      const token = Cookies.get('user_token');
      try {
        const paymentData = paymentEncrypt({
          id: payData.id,
          payment_token: result.token.id,
          order_method: payData.order_method!,
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
        onSuccess();
        console.log('res =>', res);
      } catch (error) {
        console.log('error =>', error);
      }

      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={stripePay}>
      <div className="min-h-[200px] space-y-4">
        <div className="">
          <label className="text-sm">Credit or Debit Card</label>
          <CardNumberElement
            id="card-number"
            className="w-full border py-3 px-3 rounded-md mt-2"
          />
        </div>
        <div className="flex gap-x-4">
          <div className="flex-1">
            <label className="text-sm">Credit expiry</label>
            <CardExpiryElement
              id="card-expiry"
              className="w-full border py-3 px-3 rounded-md mt-2"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm">CVC</label>
            <CardCvcElement
              id="card-cvc"
              className="w-full border py-3 px-3 rounded-md mt-2"
            />
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-xs">{errorMessage}</div>
        )}
      </div>
      <Button
        loading={isSubmitting}
        className="mt-4"
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay {payData.amount}
      </Button>
    </form>
  );
};

export default StripePay;
