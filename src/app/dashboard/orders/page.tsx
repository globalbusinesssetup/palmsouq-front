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
import Stepper from 'react-stepper-horizontal';
import { FiCalendar, FiDownload } from 'react-icons/fi';
import { BiMessageDots } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { StatusTypes } from '@/components/common/Tag';

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
  const [status, setStatus] = useState<StatusTypes>('delivered');

  const steps = [
    { title: 'Order received', icon: '/icons/check.svg' },
    { title: 'Details Review', icon: '/icons/check.svg' },
    { title: 'Production', icon: '/icons/check.svg' },
    { title: 'Ready', icon: '/icons/check.svg' },
    { title: 'Received', icon: '/icons/check.svg' },
  ];

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
                      <File varient="FileClock" />
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
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <div className="px-[18px] py-4 border border-neutral-300 rounded-xl">
          <div className="flex justify-between">
            <div className="">
              <div className="flex items-center gap-6">
                <h5 className="text-black font-semibold text-lg">
                  Order Status
                </h5>
                <Tag status={status} />
              </div>
              <div className="flex items-center gap-x-2.5 mt-3">
                <div className="flex items-center gap-x-2.5">
                  <File />
                  <p className="text-xs font-light text-neutral-500">
                    10021348
                  </p>
                </div>
                <div className="flex items-center gap-x-2.5">
                  <FiCalendar className="text-base text-neutral-400" />
                  <p className="text-xs font-light text-neutral-500">
                    22 September 2023, 22:13
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {status === 'review' || status === 'cancelled' ? (
                <Button
                  outlined
                  className="w-[146px] border-[#FDA29B] text-sm font-semibold text-error hover:text-error hover:scale-90 hover:bg-transparent flex items-center justify-center gap-x-2.5"
                >
                  <File varient="FileClose" /> Cancel Order
                </Button>
              ) : (
                <Button className="w-[105px] py-0 h-9 text-sm font-semibold flex items-center justify-center gap-x-2">
                  <FiDownload className="text-xl" />
                  Invoice
                </Button>
              )}
              <div className="flex items-center gap-x-2.5 mt-2">
                <p className="text-xs font-light text-neutral-500">
                  Cancel the order pre-production
                </p>
                <BiMessageDots className="text-base text-black" />
              </div>
            </div>
          </div>
          <Stepper
            steps={steps}
            activeStep={5}
            activeColor="#fff"
            defaultColor="#fff"
            completeColor="#22C55E"
            defaultBorderColor="#E5E7EB"
            activeBorderColor="#22C55E"
            completeBarColor="#22C55E"
            defaultBorderWidth={1.5}
            lineMarginOffset={0}
            activeTitleColor="#000000"
            defaultTitleColor="#6B7280"
            titleFontSize={12}
          />
        </div>
        <div className="flex items-start gap-x-4 mt-4">
          <div className="w-full flex-1 border border-neutral-300 bg-white rounded-xl overflow-hidden">
            <div className="px-5">
              <div className="flex items-center py-4 border-b border-[#E6E6E6]">
                <div className="flex-1">
                  <p className="text-xs font-medium text-success">
                    Business Card
                  </p>
                  <h4 className="text-black font-semibold">
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
          <div className="w-[54%] min-h-[279px] bg-white flex flex-col">
            <div className="border rounded-lg border-neutral-200 px-6 pt-4 pb-7 flex-1">
              <h5 className="text-black font-semibold">File Preview</h5>
              <div className="mt-2 min-h-full">
                {uploadedFiles.length > 0 &&
                  uploadedFiles.map((file, i) => (
                    <div
                      key={`file_${i}`}
                      className="bg-white rounded-lg pt-4 border-neutral-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="size-10 rounded-full flex items-center justify-center bg-neutral-700">
                          <FileAttach />
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
                          className="size-10 rounded-lg transition-all duration-300 hover:scale-95 bg-neutral-50 hover:bg-neutral-200 flex items-center justify-center"
                        >
                          <FiEye className="text-xl text-neutral-500" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 mt-4">
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-bold text-neutral-800">
                  Total (Exc. Vat)
                </h6>
                <h4 className="text-xl font-bold text-primary">150.00 AED</h4>
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
