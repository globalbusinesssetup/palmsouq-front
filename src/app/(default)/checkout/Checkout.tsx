'use client';
import { Avatar, Button, Modal, Step } from '@/components';
import React, { ReactNode, useEffect, useState } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { paymentIcons } from '@/constants';
import Image from 'next/image';
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { BiCheckCircle, BiLoaderAlt } from 'react-icons/bi';
import useAuth from '@/hooks/useAuth';
import {
  getAddress,
  getCountries,
  getPayMethods,
  useGetUser,
} from '@/utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import { useMount } from '@/hooks';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePay from './StripePay';
// import useRazorpay, { RazorpayOptions } from 'react-razorpay';
import { toast } from 'react-toastify';
import {
  getCountryTitle,
  getStateTitle,
  orderEncrypt,
  timezone,
} from '@/utils/helper';
import AddAddress from './AddAddress';
import { Address as AddressType, CartItem, Country } from '@/types';
import UpdateAddress from './UpdateAddress';

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
  const params = useSearchParams();
  const { ordersData, removeOrders } = useAuth();
  // const [Razorpay] = useRazorpay();
  const queryClient = useQueryClient();
  const { data: addresses, isLoading: isAddressLoading } = useQuery({
    queryKey: ['address'],
    queryFn: () => getAddress(),
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: useGetUser,
  });
  const { data: payData, isLoading: isPayDataLoading } = useQuery({
    queryKey: ['payMethods'],
    queryFn: getPayMethods,
  });

  const { data: countriesPhones, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['countries-phones'],
    queryFn: getCountries,
  });
  const [currentStep, setStep] = useState(0);
  const [defaultAddress, setDefaultAddress] = useState(addresses?.data[0]);
  const [deliveryOption, setDeliveryOption] = useState(
    deliveryOptions[0].value
  );
  const [isOpen, setOpen] = useState(false);
  const [isUpdateLoding, setUpdateLoading] = useState(false);
  const isMounted = useMount();
  const [isAddAddressOpen, setAddAddressOpen] = useState(false);

  useEffect(() => {
    if (ordersData.length < 1 && isMounted) {
      router.push('/dashboard/cart');
    }
    const supportedAreas = ['AE'];
    if (!supportedAreas.includes(defaultAddress?.state!)) {
      setDeliveryOption(deliveryOptions[1].value);
    }
    setDefaultAddress(addresses?.data[0]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses, ordersData]);

  useEffect(() => {
    if (!params.get('currentStep')) {
      router.push('/checkout?currentStep=0');
    }
    if (Number(params.get('currentStep')!) !== currentStep) {
      setStep(Number(params.get('currentStep')!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, params]);

  // const handlePayment = useCallback(() => {
  //   const options: RazorpayOptions = {
  //     key: 'rzp_test_vv1FCZvuDRF6lQ',
  //     amount: '3000',
  //     currency: 'AED',
  //     name: 'Printcraft',
  //     description: 'Test Transaction',
  //     image: 'https://example.com/your_logo',
  //     order_id: '1',
  //     handler: (res) => {
  //       console.log(res);
  //     },
  //     prefill: {
  //       name: 'Piyush Garg',
  //       email: 'youremail@example.com',
  //       contact: '9999999999',
  //     },
  //     notes: {
  //       address: 'Razorpay Corporate Office',
  //     },
  //     theme: {
  //       color: '#3399cc',
  //     },
  //   };

  //   const rzpay = new Razorpay(options);
  //   rzpay.open();
  // }, [Razorpay]);

  if (isLoading || isPayDataLoading || isCountriesLoading) {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <div className="">
          <BiLoaderAlt size={40} className="animate-spin" />
        </div>
      </main>
    );
  }

  const stripePromise = loadStripe(
    'pk_test_51KSxxsLPva6t8Wj1SbcnYQnGvroMwctxhcqlKuslVnix4eJzxNZlA2QjtIaXLyY5Ay8pzEdtN3PHUlnXonpd10Vs00jntUNba6'
  );
  const isDisabled = (val: any) => {
    const supportedAreas = ['AE'];
    if (val === 'standard') {
      return !supportedAreas.includes(defaultAddress?.state!);
    }
    if (val === 'paid') {
      return supportedAreas.includes(defaultAddress?.state!);
    }
    return false;
  };

  const totalPrice = (ordersData as CartItem[]).reduce(
    (total: number, item) => {
      const price =
        item?.flash_product?.offered > 0
          ? item?.flash_product?.offered
          : item?.flash_product?.selling;
      return total + price * Number(item.quantity);
    },
    0
  );

  const totalPriceWithDelivery =
    totalPrice! + (deliveryOption === 'paid' ? 50 : 0);
  const vat = totalPrice! * 0.05; // 5% VAT rate
  const totalPriceWithDeliveryVat = totalPriceWithDelivery + vat;

  const handleUpdateCart = async () => {
    setUpdateLoading(true);
    try {
      const res = await api.post('/cart/update-shipping', {
        cart: {
          [String(ordersData[0].id)]: {
            cart: ordersData[0].id,
            shipping_place:
              ordersData[0].flash_product.shipping_rule.shipping_places?.[0],
            single_shipping: true,
            shipping_type: '1',
          },
        },
        selected_address: defaultAddress?.id,
      });
      console.log('res', res);
    } catch (err) {
      console.log(err);
    }
    setUpdateLoading(false);
  };

  const handleNext = () => {
    if (currentStep === 0) {
      handleUpdateCart();
      setStep((prev) => prev + 1);
      router.push(`/checkout?currentStep=${currentStep + 1}`);
      return;
    }
    setOpen(true);
    console.log('Clicked!');
  };

  const handleOrder = async () => {
    try {
      const order = orderEncrypt({
        user_token: user?.data?.email!,
        order_method: 1,
        voucher: '',
        time_zone: timezone,
      });
      const res = await api.post('order/action', {
        data: order,
      });
      // if (res?.data?.data.form[0]) {
      //   console.log(res?.data?.data.form[0]);
      //   return;
      // }
      removeOrders();
      queryClient.invalidateQueries({ queryKey: ['cart', 'orders'] });
      toast.success('Order placed Successfully');
      router.push('/checkout?currentStep=2');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-neutral-50 py-10 min-h-screen">
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
                <div className="mt-4 md:mt-6 flex flex-col sm:flex-row flex-wrap gap-4">
                  {addresses?.data?.map((address: AddressType, i: number) => (
                    <Address
                      key={i}
                      address={address}
                      defaultAddress={defaultAddress}
                      onClick={() => setDefaultAddress(address)}
                      countries={countriesPhones?.countries!}
                    />
                  ))}
                  <button
                    onClick={() => setAddAddressOpen(true)}
                    className="flex-1 max-w-[calc(50%-8px)] min-h-[110px] border border-neutral-300 hover:border-primary/40 duration-300 transition-all rounded-lg flex flex-col items-center justify-center"
                  >
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
                <div className="px-6 py-4 border rounded-lg border-[#4B4EFC] flex-1">
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
                      Stripe
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
                // disabled={currentStep === 0}
                loading={currentStep === 0 && isUpdateLoding}
                onClick={handleNext}
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
                  {totalPrice} AED
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">
                  Delivery costs
                </p>
                <p className="text-sm font-medium text-[#4B4EFC]">
                  {deliveryOption === 'paid' ? '50.00 AED' : 'Free'}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-4 lg:space-y-6 pb-4 lg:pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">
                  Sub Total
                </p>
                <p className="text-sm font-medium text-neutral-600">
                  {deliveryOption === 'paid'
                    ? totalPriceWithDelivery
                    : totalPrice}{' '}
                  AED
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">VAT (5%)</p>
                <p className="text-sm font-medium text-neutral-600">{vat}</p>
              </div>
            </div>
            <div className="flex items-center justify-between lg:pt-3.5">
              <h6 className="text-xs md:text-sm font-bold text-neutral-800">
                Total (Exc. Vat)
              </h6>
              <h4 className="md:text-lg font-bold text-primary">
                {totalPriceWithDeliveryVat} AED
              </h4>
            </div>
          </div>
        )}
      </div>
      {/* Add new address  */}
      <AddAddress
        show={isAddAddressOpen}
        onClose={() => setAddAddressOpen(false)}
      />
      {/* Payment  */}
      <Modal
        show={isOpen}
        onClose={() => {
          setOpen(false);
          handleOrder();
        }}
        panelClassName={'max-w-[500px]'}
      >
        <div className="min-h-60">
          <Elements
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: 100,
              currency: 'usd',
              // clientSecret: 'afsadfsefe',
            }}
          >
            <StripePay payData={payData} />
          </Elements>
        </div>
      </Modal>
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

const Address = ({
  countries,
  address,
  defaultAddress,
  onClick,
}: {
  countries: { [key: string]: Country };
  address: AddressType;
  defaultAddress: any;
  onClick: () => void;
}) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const onEditOpen = (e: any) => {
    e.preventDefault();
    setEditOpen(true);
  };
  return (
    <div
      key={address.state}
      onClick={onClick}
      className={`flex-1 min-w-[47%] flex items-start gap-2 p-3 xl:p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
        defaultAddress?.state === address.state
          ? 'bg-neutral-50 border-[#9B9DFD]'
          : ''
      }`}
    >
      <div
        className={`group flex size-3 sm:size-4 xl:size-5 items-center justify-center rounded-full border bg-white duration-300 transition-all ${
          defaultAddress?.state === address.state ? 'border-primary' : ''
        }`}
      >
        {defaultAddress?.state === address.state && (
          <span className="size-1 sm:size-1.5 xl:size-2 rounded-full bg-primary" />
        )}
      </div>
      <div className={'flex-1 flex gap-x-2.5 cursor-pointer'}>
        <div className="flex-1">
          <p className="text-xs md:text-sm xl:text-base text-[#344054] font-semibold">
            {getStateTitle(countries, address.country, address.state)}
          </p>
          <p className="text-tiny md:text-xs xl:text-sm text-neutral-400 mt-0.5">
            {getStateTitle(countries, address.country, address.state)},{' '}
            {getCountryTitle(countries, address.country)}
          </p>
          <p className="text-tiny md:text-xs xl:text-sm text-neutral-400 mt-0.5">
            {address.address_1}, {address.city}-{address.zip}
          </p>
          <p className="text-tiny md:text-xs xl:text-sm text-neutral-600 mt-0.5">
            {address.phone}
          </p>
        </div>
        <div className="min-h-full flex flex-col justify-between items-end">
          <div className="flex items-center gap-2">
            <button onClick={onEditOpen} className="text-neutral-500 text-base">
              <FiEdit />
            </button>
          </div>
          {defaultAddress?.state === address.state && (
            <p className="h-[18px] w-12 rounded-full text-neutral-200 font-medium bg-primary text-[8px]/[14px] flex items-center justify-center">
              Default
            </p>
          )}
        </div>
      </div>
      <UpdateAddress
        data={address}
        show={isEditOpen}
        onClose={() => setEditOpen(false)}
      />
    </div>
  );
};
