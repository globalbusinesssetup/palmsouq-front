'use client';
import {
  Button,
  Excel,
  File,
  FileDownload,
  Input,
  Modal,
  Tag,
  FileAttach,
} from '@/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FiCalendar, FiDownload } from 'react-icons/fi';
import { BiMessageDots } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { StatusTypes } from '@/components/common/Tag';
import OrderStep from '@/app/order/OrderStep';

const checkoutData = [
  {
    title: 'Quantity',
    value: '1000',
  },
  {
    title: 'Size',
    value: '9x5.5 cm',
  },
  {
    title: 'Print Side',
    value: 'Bothside',
  },
  {
    title: 'File Type',
    value: 'Upload file',
  },
  {
    title: 'Turnaround',
    value: '24 Business Hours',
  },
];

const uploadedFiles = [
  {
    name: 'document.pdf',
    size: '25kb',
  },
  // {
  //   name: 'document2.pdf',
  //   size: '35kb',
  // },
];

const Orders = () => {
  const { control } = useForm();
  const [isOpen, setOpen] = useState(false);
  const [isFilePreviewOpen, setFilePreviewOpen] = useState(false);
  const [status, setStatus] = useState<StatusTypes>('review');

  const steps = [
    { title: 'Order received', icon: '/icons/check.svg' },
    { title: 'Details Review', icon: '/icons/check.svg' },
    { title: 'Production', icon: '/icons/check.svg' },
    { title: 'Ready', icon: '/icons/check.svg' },
    { title: 'Received', icon: '/icons/check.svg' },
  ];

  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden max-w-[912px]">
      <div className="py-3 lg:py-3.5 px-4 lg:px-6 flex items-center justify-between gap-x-2">
        <h5 className="text-sm sm:text-base lg:text-lg whitespace-nowrap font-semibold text-neutral-700">
          My Order&apos;s
        </h5>
        <div className="flex items-center justify-end gap-x-3">
          <Input
            control={control}
            name="search"
            type="search"
            className="max-w-[320px] rounded-full text-sm h-8 sm:h-8 lg:h-[37px]"
            placeholder="Search Product name"
            wrapClassName="hidden sm:block"
          />
          <Button
            outlined
            className="h-9 w-[115px] sm:w-[135px] py-0 flex items-center gap-x-2 sm:gap-x-2.5 border-[#EAECF0] text-xs lg:text-sm font-medium sm:font-semibold whitespace-nowrap"
          >
            <Excel /> Export data
          </Button>
        </div>
      </div>
      <div className="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
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
                  <tr
                    key={`table_${i}`}
                    className="border-b border-neutral-200"
                  >
                    <td className="py-4 pl-6">
                      <button onClick={() => setOpen(true)}>
                        <File varient="FileClock" />
                      </button>
                    </td>
                    <td className="py-4 text-neutral-500 text-xs lg:text-sm">
                      {10021348 - i}
                    </td>
                    <td className="py-4 w-[30%]">
                      <p className="text-tiny lg:text-xs text-success">
                        Business Card
                      </p>
                      <p className="text-xs lg:text-sm text-neutral-600 font-semibold">
                        350 Gsm Matt Lamination
                      </p>
                    </td>
                    <td className="py-4 w-[20%]">
                      <p className="text-xs lg:text-[13px]/[19px] text-neutral-500 uppercase">
                        02 JUN 2023
                      </p>
                      <p className="text-xs lg:text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                        21:13
                      </p>
                    </td>
                    <td className="py-4 text-neutral-500 text-xs lg:text-sm">
                      1000
                    </td>
                    <td className="py-4 text-neutral-500 text-xs lg:text-sm">
                      {'300.00'}
                    </td>
                    <td className="py-4">
                      <Tag status={i === 1 ? 'failed' : 'success'} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between py-3.5 px-6">
          <p className="text-xs text-neutral-500 flex-1">
            Total Items: <span className="font-semibold">{'02'}</span>
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
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <div className="flex md:hidden items-center justify-end pb-3 -mt-1">
          <button onClick={() => setOpen(false)}>
            <IoMdClose className="text-xl" />
          </button>
        </div>
        <div className="px-[18px] py-4 border border-neutral-300 rounded-xl">
          <div className="flex justify-between">
            <div className="">
              <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-6">
                <h5 className="text-black font-semibold text-xs xs:text-sm sm:text-base md:text-lg">
                  Order Status
                </h5>
                <Tag status={status} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-y-0 sm:gap-x-2.5 mt-2 md:mt-3">
                <div className="flex items-center gap-x-2.5">
                  <File />
                  <p className="text-tiny sm:text-xs font-light text-neutral-500">
                    10021348
                  </p>
                </div>
                <div className="flex items-center gap-x-2.5">
                  <FiCalendar className="text-base text-neutral-400" />
                  <p className="text-tiny sm:text-xs font-light text-neutral-500">
                    22 September 2023, 22:13
                  </p>
                </div>
              </div>
            </div>
            <div
              aria-disabled={status === 'cancelled'}
              className="flex flex-col items-end aria-disabled:opacity-40"
            >
              {status === 'review' || status === 'cancelled' ? (
                <Button
                  outlined
                  disabled={status === 'cancelled'}
                  onClick={() => setStatus('cancelled')}
                  className="w-32 sm:w-[146px] border-[#FDA29B] !text-xs md:!text-sm font-semibold text-error hover:text-error hover:scale-90 hover:bg-transparent flex items-center justify-center gap-x-2.5"
                >
                  <File varient="FileClose" className="size-4 md:size-5" />{' '}
                  Cancel Order
                </Button>
              ) : (
                <Button className="w-[90px] sm:w-[105px] py-0 h-8 sm:h-9 text-xs sm:text-sm font-semibold flex items-center justify-center gap-x-2">
                  <FiDownload className="text-base sm:text-lg md:text-xl" />
                  Invoice
                </Button>
              )}
              <div className="flex items-center gap-x-2.5 mt-2">
                <p className="text-tiny md:text-xs font-light text-right text-neutral-500">
                  Cancel the order pre-production
                </p>
                <BiMessageDots className="text-xs sm:text-base text-black" />
              </div>
            </div>
          </div>
          <div
            aria-disabled={status === 'cancelled'}
            className="flex flex-col sm:flex-row sm:items-center justify-center pt-10 pb-4 aria-disabled:opacity-45"
          >
            {steps.map((step, i) => (
              <OrderStep
                key={`step_${i}`}
                index={i}
                lastIndex={steps.length - 1}
                title={step.title}
                status={status}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-y-4 sm:gap-y-0 sm:gap-x-4 mt-4">
          <div className="w-full flex-1 border border-neutral-300 bg-white rounded-xl overflow-hidden">
            <div className="px-5">
              <div className="flex items-center py-4 border-b border-[#E6E6E6]">
                <div className="flex-1">
                  <p className="text-xs font-medium text-success">
                    Business Card
                  </p>
                  <h4 className="text-black font-semibold text-sm md:text-base">
                    350 Gsm Matt Lamination
                  </h4>
                </div>
              </div>
              <div className="space-y-4 pt-6 pb-4">
                {checkoutData.map((data, i) => (
                  <div
                    key={`data_${i}`}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm font-medium text-neutral-400">
                      {data.title}
                    </p>
                    <p className="text-sm font-medium text-neutral-600">
                      {data.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex-1 md:w-[54%] min-h-52 sm:min-h-[279px] bg-white flex flex-col">
            <div className="border rounded-lg border-neutral-200 px-4 md:px-6 pt-4 pb-7 flex-1">
              <h5 className="text-black font-semibold text-sm md:text-base">
                File Preview
              </h5>
              <div className="mt-2 min-h-full">
                {uploadedFiles.length > 0 &&
                  uploadedFiles.map((file, i) => (
                    <div
                      key={`file_${i}`}
                      className="bg-white rounded-lg pt-4 border-neutral-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="size-8 sm:size-10 rounded-full flex items-center justify-center bg-neutral-700">
                          <FileAttach className="size-5 sm:size-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#111827] text-sm">{file.name}</p>
                          <p className="text-xs text-[#6B7280] mt-1">
                            {/* {formatFileSize(file.size)} */}
                            {file.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => setFilePreviewOpen(true)}
                          className="size-8 sm:size-10 rounded-lg transition-all duration-300 hover:scale-95 bg-neutral-50 hover:bg-neutral-200 flex items-center justify-center"
                        >
                          <FiEye className="text-lg sm:text-xl text-neutral-500" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-3 md:p-4 border border-neutral-200 rounded-lg bg-neutral-50 mt-4">
              <div className="flex items-center justify-between">
                <h6 className="text-xs md:text-sm font-bold text-neutral-800">
                  Total (Exc. Vat)
                </h6>
                <h4 className="text-sm sm:text-base md:text-xl font-bold text-primary">
                  150.00 AED
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* file preview modal  */}
      <Modal
        show={isFilePreviewOpen}
        panelClassName="p-0"
        onClose={() => setFilePreviewOpen(false)}
      >
        <div className="flex items-center justify-between bg-primary px-6 py-3">
          <p className="text-white text-sm font-bold">File Preview</p>
          <button onClick={() => setFilePreviewOpen(false)}>
            <IoMdClose className="text-2xl text-white" />
          </button>
        </div>
        <div className="p-4 bg-white">
          <div className="w-full h-[624px] relative">
            <Image
              src={'/temp-banner.png'}
              className="object-cover"
              fill
              alt="preview"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
