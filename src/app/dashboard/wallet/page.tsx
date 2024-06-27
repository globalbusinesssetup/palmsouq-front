'use client';
import { FileDownload, Tag, WalletAdd } from '@/components';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const Wallet = () => {
  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden p-4 max-w-[912px]">
      <h5 className="xs:text-lg font-semibold text-neutral-900">My Wallet</h5>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-4 sm:gap-y-0 sm:gap-x-2 md:gap-x-4 mt-4">
        <div className="flex-1 min-h-[132px] rounded-lg bg-[#6835B1] flex flex-col justify-center items-center text-center">
          <h4 className="text-xl xl:text-2xl text-white font-bold uppercase">
            AED 600.00
          </h4>
          <p className="text-xs text-white mt-1">Wallet Balance</p>
        </div>
        <button className="flex-1 min-h-[132px] border rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:bg-neutral-200">
          <div className="size-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <WalletAdd />
          </div>
          <p className="text-xs text-neutral-800 mt-3">Recharge Wallet</p>
        </button>
      </div>
      <div className="mt-8">
        <p className="text-neutral-700">Recharge History</p>
        <div className="mt-4 border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="border-b">
                <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
                  <th className="text-xs font-semibold text-[#667085] py-3.5 pl-6">
                    Amount
                  </th>
                  <th className="text-xs font-semibold text-[#667085] py-3.5">
                    Sumbit Date
                  </th>
                  <th className="text-xs font-semibold text-[#667085] py-3.5">
                    Payment Method
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
                    <tr
                      key={`table_${i}`}
                      className="border-b border-neutral-200"
                    >
                      <td className="py-3 md:py-4 text-neutral-500 pl-6 text-xs font-medium xs:font-normal xs:text-sm lg:text-base">
                        300.00 AED
                      </td>
                      <td className="py-3 md:py-4 w-[20%]">
                        <p className="text-xs md:text-[13px]/[19px] text-neutral-500 uppercase">
                          02 SEP 2023
                        </p>
                        <p className="text-xs md:text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                          21:13
                        </p>
                      </td>
                      <td className="py-3 md:py-4 text-neutral-500 text-xs md:text-sm">
                        Stripe Payment
                      </td>
                      <td className="py-3 md:py-4">
                        <Tag status="success" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end py-3.5 px-6">
            <div className="flex items-center justify-between gap-x-5 xs:w-5/12 lg:w-4/12">
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
      </div>
    </div>
  );
};

export default Wallet;
