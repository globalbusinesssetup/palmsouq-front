'use client';
import { Button, Excel, FileDownload, Input, Modal, Tag } from '@/components';
import Steps from 'rc-steps';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const Orders = () => {
  const { control } = useForm();
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
      <div className="py-3.5 px-6 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-neutral-700">
          My Order&apos;s
        </h5>
        <div className="flex items-center gap-x-3">
          <Input
            control={control}
            name="search"
            type="search"
            className="max-w-[320px] rounded-full text-sm h-[37px]"
            placeholder="Search Product name"
          />
          <Button
            outlined
            className="h-9 w-[135px] py-0 flex items-center gap-x-2.5 border-[#EAECF0] text-sm font-semibold"
          >
            <Excel /> Export data
          </Button>
        </div>
      </div>
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
              <th className="text-xs font-semibold text-[#667085] py-3.5 pl-6"></th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Invoice No.
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Product Name
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Confirm Date
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Quantity
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Amount
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(' ')
              .map((_, i) => (
                <tr key={`table_${i}`} className="border-b border-neutral-200">
                  <td className="py-4 pl-6">
                    <button onClick={() => setOpen(true)}>
                      <FileDownload />
                    </button>
                  </td>
                  <td className="py-4 text-neutral-500 text-sm">
                    {10021348 - i}
                  </td>
                  <td className="py-4 w-[30%]">
                    <p className="text-xs text-success">Business Card</p>
                    <p className="text-sm text-neutral-600 font-semibold">
                      350 Gsm Matt Lamination
                    </p>
                  </td>
                  <td className="py-4 w-[20%]">
                    <p className="text-[13px]/[19px] text-neutral-500 uppercase">
                      02 JUN 2023
                    </p>
                    <p className="text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                      21:13
                    </p>
                  </td>
                  <td className="py-4 text-neutral-500 text-sm">1000</td>
                  <td className="py-4 text-neutral-500">{'300.00'}</td>
                  <td className="py-4">
                    <Tag status={i === 1 ? 'failed' : 'success'} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between py-3.5 px-6">
          <p className="text-xs text-neutral-500 flex-1">
            Total Items: <span className="font-semibold">{'02'}</span>
          </p>
          <div className="flex items-center justify-between w-4/12">
            <button className="size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center">
              <FaAngleLeft className="text-lg" />
            </button>
            <p className="text-sm text-center text-neutral-500">Page 1 of 1</p>
            <button className="size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center">
              <FaAngleRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
      <Modal show={isOpen} onClose={() => setOpen(false)} panelClassName="h-40">
        <Steps current={1}>
          <Steps.Step title="first" />
          <Steps.Step title="second" />
          <Steps.Step title="third" />
        </Steps>
      </Modal>
    </div>
  );
};

export default Orders;
