'use client';
import { Button, Modal, Image, Avatar } from '@/components';
import React from 'react';
import { FaHandshake } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { paymentIcons } from '@/constants';

const PaymentMethods = ({
  isVisible,
  onClose,
  payData,
  orderMethod,
  isSubmitting,
  handleConfirm,
  order,
  onMethodChange,
}) => {
  const handlePayMethod = (method: number) => {
    onMethodChange(method);
  };
  return (
    <Modal show={isVisible} onClose={onClose} panelClassName={'max-w-[500px]'}>
      <div className="flex items-center justify-between">
        <p className="text-black text-base font-bold">Select Payment Method</p>
        <button onClick={onClose} className=" rounded-full bg-gray-100 p-1">
          <IoMdClose className="text-lg text-black" />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-0 sm:max-w-[506px]">
        <button
          disabled={payData?.stripe! === 0}
          onClick={() => handlePayMethod(3)}
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
          onClick={() => handlePayMethod(2)}
          className={`cursor-pointer p-6 border rounded-lg flex-1 h-full flex flex-col items-center justify-center ${
            orderMethod === 2 ? 'border-[#9B9DFD]' : 'border-neutral-300'
          }`}
        >
          <Avatar className="bg-neutral-50 mx-auto size-9">
            <FaHandshake className="text-[#344054] text-lg" />
          </Avatar>
          <h5 className="mt-2 text-sm font-semibold text-neutral-800">COD</h5>
          <p className="text-xs text-neutral-400 mt-6">
            <span className="text-primary font-semibold">Cash on delivery</span>
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
  );
};

export default PaymentMethods;
