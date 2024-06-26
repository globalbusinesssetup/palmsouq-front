'use client';
import { Avatar, Button, Step } from '@/components';
import React, { ReactNode, useEffect, useState } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { FiCheckCircle, FiEdit, FiPlus } from 'react-icons/fi';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { paymentIcons } from '@/constants';
import Image from 'next/image';
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { BiCheckCircle } from 'react-icons/bi';

const steps = [
  {
    title: 'Shipping Method',
    icon: <TbTruckDelivery className="text-base xs:text-xl md:text-[26px]" />,
  },
  {
    title: 'Payment',
    icon: <IoCardOutline className="text-base xs:text-xl md:text-[26px]" />,
  },
  {
    title: 'Confirmation',
    icon: <BiCheckCircle className="text-base xs:text-xl md:text-[26px]" />,
  },
];

const addresses = [
  {
    title: 'Sharjah',
    value: 'sharjah',
    location: 'Sharjah, United Arab Emirates',
    street: 'Al Wahda Road, Industrial Area # 4',
    phone: '+971 55 6265479',
  },
];

const deliveryOptions = [
  {
    title: 'Standard',
    value: 'standard',
    desc: 'Enjoy free shipping across',
    desc2: 'Dubai, Sharjah and Ajman.',
  },
  {
    title: 'Paid',
    value: 'paid',
    desc: 'Get your order delivered quickly with Extra Charges.',
  },
  {
    title: 'Pickup',
    value: 'pickup',
    desc: (
      <p>
        Wait for{' '}
        <span className="font-medium text-neutral-600">Notification</span> and
        collect your order directly.
      </p>
    ),
  },
];

const Checkout = () => {
  const router = useRouter();
  const [currentStep, setStep] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState(addresses[0].value);
  const [deliveryOption, setDeliveryOption] = useState(
    deliveryOptions[0].value
  );

  useEffect(() => {
    const supportedAreas = ['dubai', 'sharjah', 'ajman'];
    if (!supportedAreas.includes(defaultAddress)) {
      setDeliveryOption(deliveryOptions[1].value);
    }
  }, [defaultAddress]);

  const isDisabled = (val: any) => {
    const supportedAreas = ['dubai', 'sharjah', 'ajman'];
    if (val === 'standard') {
      return !supportedAreas.includes(defaultAddress);
    }
    if (val === 'paid') {
      return supportedAreas.includes(defaultAddress);
    }
    return false;
  };

  return (
    <main className="bg-neutral-50 py-10">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-y-5 lg:gap-y-0 gap-x-4 xl:gap-x-6 px-4">
        <div className="flex-1 lg:max-w-[920px] lg:mx-auto px-3 xs:px-5 xl:px-10 py-4 md:py-8 border rounded-xl border-neutral-300 bg-white">
          <div className="overflow-hidden flex items-center justify-between gap-x-2 xs:gap-x-3 md:gap-x-5 pb-4 md:pb-6 border-b border-neutral-200">
            {steps.map((step, i) => (
              <Step
                key={`step_${i}`}
                index={i}
                className="min-w-[90px] xs:min-w-[115px] sm:min-w-[155px] lg:min-w-[185px] gap-x-1 xs:gap-x-2 md:gap-x-4"
                circleClassName="size-6 xs:size-8 md:size-11"
                title={step.title}
                isActive={currentStep === i}
                icon={step.icon}
                isCompleted={
                  currentStep > i || currentStep === steps.length - 1
                }
              />
            ))}
          </div>
          {currentStep === 0 ? (
            <>
              <div className="mt-5 md:mt-8">
                <h4 className="md:text-lg text-neutral-900 font-semibold">
                  Shipping Address
                </h4>
                <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-4">
                  <RadioGroup
                    value={defaultAddress}
                    onChange={setDefaultAddress}
                    aria-label="Server size"
                    className={
                      'flex-1 sm:max-w-[calc(50%-16px)] flex items-center gap-4'
                    }
                  >
                    {addresses.map((address) => (
                      <Field
                        key={address.value}
                        className={`flex-1 flex items-start gap-2 p-3 xl:p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
                          defaultAddress === address.value
                            ? 'bg-neutral-50 border-[#9B9DFD]'
                            : ''
                        }`}
                      >
                        <Radio
                          value={address.value}
                          className="group flex size-3 sm:size-4 xl:size-5 items-center justify-center rounded-full border bg-white data-[checked]:border-primary duration-300 transition-all"
                        >
                          <span className="invisible size-1 sm:size-1.5 xl:size-2 rounded-full bg-primary group-data-[checked]:visible" />
                        </Radio>
                        <Label
                          className={'flex-1 flex gap-x-2.5 cursor-pointer'}
                        >
                          <div className="flex-1">
                            <p className="text-xs md:text-sm xl:text-base text-[#344054] font-semibold">
                              {address.title}
                            </p>
                            <p className="text-tiny md:text-xs xl:text-sm text-neutral-400 mt-0.5">
                              {address.location}
                            </p>
                            <p className="text-tiny md:text-xs xl:text-sm text-neutral-400 mt-0.5">
                              {address.street}
                            </p>
                            <p className="text-tiny md:text-xs xl:text-sm text-neutral-600 mt-0.5">
                              {address.phone}
                            </p>
                          </div>
                          <div className="min-h-full flex flex-col justify-between items-end">
                            <div className="flex items-center gap-2">
                              <button className="text-neutral-500 text-base">
                                <FiEdit />
                              </button>
                            </div>
                            <p className="h-[18px] w-12 rounded-full text-neutral-200 font-medium bg-primary text-[8px]/[14px] flex items-center justify-center">
                              Default
                            </p>
                          </div>
                        </Label>
                      </Field>
                    ))}
                  </RadioGroup>
                  <button className="flex-1 min-h-[93px] border border-neutral-300 hover:border-primary/40 duration-300 transition-all rounded-lg flex flex-col items-center justify-center">
                    <div className="">
                      <div className="flex items-center justify-center size-8 rounded-full bg-neutral-100 text-[#667085] mx-auto">
                        <FiPlus />
                      </div>
                      <p className="text-xs text-neutral-800 mt-3">
                        Add new address
                      </p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="mt-5 md:mt-8">
                <h4 className="md:text-lg text-neutral-900 font-semibold">
                  Delivery and Pickup
                </h4>
                <RadioGroup
                  value={deliveryOption}
                  onChange={setDeliveryOption}
                  aria-label="Server size"
                  className={
                    'flex flex-col sm:flex-row sm:items-center gap-4 mt-6'
                  }
                >
                  {deliveryOptions.map((opt) => (
                    <Field
                      key={opt.value}
                      className={`flex-1 gap-2 p-3 xl:p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
                        deliveryOption === opt.value
                          ? 'bg-neutral-50 border-[#9B9DFD]'
                          : ''
                      }`}
                    >
                      <Label
                        aria-disabled={isDisabled(opt.value)}
                        className={'cursor-pointer aria-disabled:opacity-60'}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-2">
                            <Radio
                              value={opt.value}
                              disabled={isDisabled(opt.value)}
                              className="group flex size-4 xl:size-5 items-center justify-center rounded-full border bg-white data-[checked]:border-primary duration-300 transition-all"
                            >
                              <span className="invisible size-1.5 xl:size-2 rounded-full bg-primary group-data-[checked]:visible" />
                            </Radio>
                            <p className="text-xs md:text-sm xl:text-base text-[#344054] font-semibold">
                              {opt.title}
                            </p>
                          </div>
                          <Tag val={opt.value}>
                            {opt.value === 'standard'
                              ? 'Free'
                              : opt.value === 'paid'
                              ? '50.00 AED'
                              : 'Warehouse'}
                          </Tag>
                        </div>
                        <div className="flex-1 pt-4">
                          <div className="text-tiny md:text-xs xl:text-sm text-neutral-400 mt-0.5">
                            {opt.desc}
                          </div>
                          {opt.desc2 && (
                            <p className="text-tiny md:text-xs xl:text-sm text-neutral-600 mt-0.5">
                              {opt.desc2}
                            </p>
                          )}
                        </div>
                      </Label>
                    </Field>
                  ))}
                </RadioGroup>
              </div>
            </>
          ) : currentStep === 1 ? (
            <div className="mt-8">
              <h4 className="lg:text-lg text-neutral-900 font-semibold">
                Select Payment Options
              </h4>
              <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-0 sm:max-w-[506px]">
                <div className="px-6 py-4 border rounded-lg border-neutral-300 flex-1">
                  <p className="text-sm font-semibold text-neutral-800">
                    Pay with Card
                  </p>
                  <div className="flex items-center mt-2 gap-x-2 px-4 py-2 bg-neutral-100">
                    {paymentIcons.map((icon, i) => (
                      <Image
                        key={i}
                        src={icon}
                        width={34}
                        height={23}
                        className="rounded"
                        alt="payment icon"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-4">
                    Secure Payment
                  </p>
                  <p className="text-xs text-neutral-500 font-medium">
                    Powered by{' '}
                    <span className="font-semibold text-neutral-800">
                      (Gateway Name)
                    </span>
                    .
                  </p>
                </div>
                <div className="p-6 border rounded-lg border-neutral-300 flex-1 h-full flex flex-col items-center justify-center">
                  <Avatar className="bg-neutral-50 mx-auto size-9">
                    <IoWalletOutline className="text-[#344054] text-lg" />
                  </Avatar>
                  <h5 className="mt-2 text-sm font-semibold text-neutral-800">
                    My Wallet
                  </h5>
                  <p className="text-xs text-neutral-400 mt-6">
                    Wallet Balance :{' '}
                    <span className="text-primary font-semibold">0.00 AED</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="mt-16">
                <Image
                  src={'/icons/order-confirmed.svg'}
                  width={124}
                  height={85}
                  alt="icon"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-700 mt-6">
                Order Confirmed!
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Your order has been successfully proceeded!
              </p>
              <Button
                onClick={() => router.push('/dashboard/orders')}
                className="py-0 h-11 max-w-[336px] font-semibold mt-8 flex items-center justify-center gap-x-2"
              >
                Go to My Order&apos;s{' '}
                <IoIosArrowRoundForward className="text-2xl" />
              </Button>
              <Link
                href="/"
                className="mt-4 text-neutral-500 text-sm sm:text-base"
              >
                Continue to Home
              </Link>
            </div>
          )}
          {currentStep !== steps.length - 1 && (
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => setStep((prev) => prev - 1)}
                disabled={currentStep === 0}
                className="text-xs sm:text-sm font-semibold text-neutral-500 flex items-center justify-center gap-x-2"
              >
                <IoIosArrowRoundBack className="text-2xl sm:text-2xl" /> Back to
                Cart
              </button>
              <Button
                disabled={currentStep === 2}
                onClick={() => setStep((prev) => prev + 1)}
                className="flex items-center justify-center gap-x-2 w-[170px] sm:w-[227px] text-xs sm:text-sm py-2 sm:py-2.5"
              >
                {currentStep === 0 ? (
                  <>
                    Continue to Payment
                    <IoIosArrowRoundForward className="text-xl sm:text-2xl" />
                  </>
                ) : (
                  <>
                    <FaCheck className="text-lg" />
                    Complete Order
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        {currentStep !== steps.length - 1 && (
          <div className="lg:w-[336px] h-fit py-4 px-6 border rounded-xl border-neutral-300 bg-white">
            <h5 className="text-black font-semibold pb-4">Order Summery</h5>
            <div className="lg:mt-4 space-y-4 lg:space-y-6 pb-4 lg:pb-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">Products</p>
                <p className="text-sm font-medium text-neutral-600">
                  300.00 AED
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">
                  Delivery costs
                </p>
                <p className="text-sm font-medium text-[#4B4EFC]">Free</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 lg:space-y-6 pb-4 lg:pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">
                  Sub Total
                </p>
                <p className="text-sm font-medium text-neutral-600">
                  300.00 AED
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">VAT (5%)</p>
                <p className="text-sm font-medium text-neutral-600">15.00</p>
              </div>
            </div>
            <div className="flex items-center justify-between lg:pt-3.5">
              <h6 className="text-xs md:text-sm font-bold text-neutral-800">
                Total (Exc. Vat)
              </h6>
              <h4 className="md:text-lg font-bold text-primary">315.00 AED</h4>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Checkout;

const Tag = ({ children, val }: { children: ReactNode; val: string }) => {
  return (
    <span
      className={`px-2 md:px-3 py-0.5 rounded-full text-tiny md:text-xs font-medium ${
        val === 'standard'
          ? 'text-[#4B4EFC] bg-[#F5F5FF]'
          : val === 'paid'
          ? 'text-success bg-[#ECFDF3]'
          : 'text-[#B54708] bg-[#FFFAEB]'
      } `}
    >
      {children}
    </span>
  );
};
