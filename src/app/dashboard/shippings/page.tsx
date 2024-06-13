'use client';
import React, { useState } from 'react';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Input, Button } from '@/components';
import { useForm } from 'react-hook-form';

const addresses = [
  { title: 'Sharjah', value: 'sharjah', isDefault: true },
  { title: 'Dubai', value: 'dubai', isDefault: false },
];

const Shippings = () => {
  const [defaultAddress, setDefaultAddress] = useState(addresses[0].value);
  const { control } = useForm();

  return (
    <div className="bg-white border border-neutral-200 rounded-xl py-[18px] px-8">
      <h4 className="text-lg text-neutral-900 font-semibold">
        Shipping Address
      </h4>
      <div className="mt-6">
        <RadioGroup
          value={defaultAddress}
          onChange={setDefaultAddress}
          aria-label="Server size"
          className={'flex items-center gap-4'}
        >
          {addresses.map((address) => (
            <Field
              key={address.value}
              className={`flex-1 flex items-start gap-2 p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
                defaultAddress === address.value
                  ? 'bg-neutral-50 border-[#9B9DFD]'
                  : ''
              }`}
            >
              <Radio
                value={address.value}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:border-primary duration-300 transition-all"
              >
                <span className="invisible size-2 rounded-full bg-primary group-data-[checked]:visible" />
              </Radio>
              <Label className={'flex-1 flex gap-x-2.5 cursor-pointer'}>
                <div className="flex-1">
                  <p className="text-base text-[#344054] font-semibold">
                    {address.title}
                  </p>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    Dubai, United Arab Emirates
                  </p>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    Al Wahda Road, Industrial Area # 4
                  </p>
                  <p className="text-sm text-neutral-600 mt-0.5">
                    +971 55 6265479
                  </p>
                </div>
                <div className="min-h-full flex flex-col justify-between items-end">
                  <div className="flex items-center gap-2">
                    <button className="text-neutral-500 text-base">
                      <FiEdit />
                    </button>
                    {defaultAddress !== address.value && (
                      <button className="text-neutral-500 text-base">
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                  {defaultAddress === address.value && (
                    <p className="h-[18px] w-12 rounded-full text-neutral-200 font-medium bg-primary text-[8px]/[14px] flex items-center justify-center">
                      Default
                    </p>
                  )}
                </div>
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-8">
        <h4 className="text-lg text-neutral-900 font-semibold">
          New Shipping Address
        </h4>
        <div className="flex gap-x-6 mt-8"></div>
        <div className="flex gap-x-6 mt-8"></div>
        <Input
          control={control}
          name="address"
          label="Address"
          placeholder="Street, Building, Apt. etc"
          wrapClassName="mt-6"
        />
        <div className="flex items-center justify-end">
          <Button type="submit" className="w-[150px] text-sm font-semibold">
            Add new address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shippings;
