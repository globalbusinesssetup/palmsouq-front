'use client';
import { Button, Excel, FileDownload, Tag } from '@/components';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const Payments = () => {
  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden max-w-full">
      <div className="py-3.5 px-4 md:x-6 flex items-center justify-between">
        <h5 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-700">
          Payment&apos;s History
        </h5>
        <div className="flex items-center gap-x-3">
          <Button
            outlined
            className="h-9 w-[115px] sm:w-[135px] py-0 flex items-center gap-x-2 sm:gap-x-2.5 border-[#EAECF0] text-xs lg:text-sm font-medium sm:font-semibold"
          >
            <Excel /> Export data
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[646px]">
          <thead>
            <tr className="bg-[#F9FAFB] text-left">
              <th className="text-xs font-semibold text-[#667085] py-3.5 pl-6">
                PV
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Amount
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Submit Date
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Gateway
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Tracking No
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Reference No
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(2)
              .fill(' ')
              .map((_, i) => (
                <tr key={`table_${i}`} className="border-b border-neutral-200">
                  <td className="py-4 pl-6 pr-2">
                    <button>
                      <FileDownload />
                    </button>
                  </td>
                  <td className="py-4 text-neutral-500 text-xs md:text-sm lg:text-base pr-2">
                    300.00 AED
                  </td>
                  <td className="py-4 w-[20%] pr-2">
                    <p className="text-xs md:text-[13px]/[19px] text-neutral-500 uppercase">
                      02 SEP 2023
                    </p>
                    <p className="text-xs md:text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                      21:13
                    </p>
                  </td>
                  <td className="py-4 text-neutral-500 text-xs md:text-sm pr-2">
                    Stripe Payment
                  </td>
                  <td className="py-4 text-neutral-500 text-xs md:text-sm pr-2">
                    123456
                  </td>
                  <td className="py-4 text-neutral-500 text-xs md:text-sm pr-2">
                    654321
                  </td>
                  <td className="py-4">
                    <Tag status="confirmed" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-3.5 px-4 md:px-6">
        <p className="text-xs text-neutral-500 flex-1">
          Total Items: <span className="font-semibold">02</span>
        </p>
        <div className="flex items-center justify-between gap-x-3 xs:w-6/12 lg:w-4/12">
          <button className="size-6 sm:size-8 lg:size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center">
            <FaAngleLeft className="text-sm sm:text-lg" />
          </button>
          <p className="text-xs sm:text-sm text-center text-neutral-500">
            Page 1 of 1
          </p>
          <button className="size-6 sm:size-8 lg:size-10 rounded-lg border border-[#EAECF0] text-[#EAECF0] transition-all duration-300 hover:text-primary/70 hover:border-primary/70 flex items-center justify-center">
            <FaAngleRight className="text-sm sm:text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
