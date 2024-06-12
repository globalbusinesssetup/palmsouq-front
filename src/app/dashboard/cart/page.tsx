'use client';
import { Button, CheckBox, FileAttach, FileSearch, Modal } from '@/components';
import { formatFileSize } from '@/utils/helper';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsHandbag } from 'react-icons/bs';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoCheckmark } from 'react-icons/io5';

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
  {
    name: 'document2.pdf',
    size: '35kb',
  },
];

const Cart = () => {
  const [isAllChecked, setChecked] = useState(false);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isFilePreviewOpen, setFilePreviewOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
      <div className="py-3.5 px-6 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-neutral-700">My Cart</h5>
        <div className="flex items-center gap-x-3">
          <Button
            disabled
            outlined
            className="h-9 w-[100px] py-0 flex items-center gap-x-2.5 border-[#EAECF0] text-sm font-semibold"
          >
            <FiTrash2 className="text-xl" /> Delete
          </Button>
          <Button
            onClick={() => setCheckoutOpen(true)}
            // disabled
            className="h-10 w-[169px] py-0 flex gap-x-2 items-center justify-center text-sm"
          >
            <IoCheckmark className="text-base" /> Proceed Order&apos;s
          </Button>
        </div>
      </div>
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
              <th className="pl-6 py-3.5 w-[10%]">
                <CheckBox
                  checked={isAllChecked}
                  onChange={(e: any) => setChecked(e?.target?.checked)}
                />
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                Action
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5 w-[30%]">
                Product Name
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                Submit Date
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5 w-[10%]">
                Quantity
              </th>
              <th className="text-xs font-semibold text-[#667085] py-3.5 w-[10%]">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(2)
              .fill(' ')
              .map((_, i) => (
                <tr key={`table_${i}`} className="border-b border-neutral-200">
                  <td className="py-4 pl-6 w-[10%]">
                    <CheckBox
                      checked={isAllChecked}
                      onChange={(e: any) => setChecked(e?.target?.checked)}
                    />
                  </td>
                  <td className="py-4 flex min-w-[20%] items-center gap-x-2">
                    <button className="size-10 bg-neutral-100 text-[#475467] transition-all duration-300 hover:bg-red-100 hover:text-red-600 rounded-lg flex items-center justify-center">
                      <FiTrash2 />
                    </button>
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="size-10 bg-neutral-100 hover:bg-neutral-300 rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      <FileSearch />
                    </button>
                  </td>
                  <td className="py-4 w-[30%]">
                    <p className="text-xs text-success">Business Card</p>
                    <p className="text-sm text-neutral-600 font-semibold">
                      350 Gsm Matt Lamination
                    </p>
                  </td>
                  <td className="py-4 w-[20%]">
                    <p className="text-[13px]/[19px] text-neutral-500 uppercase">
                      02 SEP 2023
                    </p>
                    <p className="text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                      21:13
                    </p>
                  </td>
                  <td className="py-4 text-neutral-500 text-sm w-[10%]">
                    1000
                  </td>
                  <td className="py-4 text-neutral-500 text-sm w-[10%]">
                    150.00
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
      <Modal show={isPreviewOpen} onClose={() => setPreviewOpen(true)}>
        <div className="flex items-center justify-between pb-4">
          <p className="text-black text-sm font-bold">Preview</p>
          <button onClick={() => setPreviewOpen(false)}>
            <IoMdClose className="text-2xl" />
          </button>
        </div>
        <div className="flex items-start gap-x-4">
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
                <button>
                  <FiEdit className="text-xl leading-none text-[#667085]" />
                </button>
              </div>
              <div className="space-y-[18px] pt-6 pb-8">
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
            <div className="py-3.5 px-6 bg-neutral-50 flex items-center justify-between">
              <p className="text-sm font-bold text-neutral-800">
                Total (Exc. Vat)
              </p>
              <p className="text-lg font-bold text-primary">150.00 AED</p>
            </div>
          </div>
          <div className="w-[54%] bg-white">
            <div className="border rounded-lg border-neutral-200 px-6 pt-4 pb-7">
              <h5 className="text-black font-semibold">File Preview</h5>
              <div className="mt-2">
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
              <div className="flex items-center gap-x-3 mt-4">
                <Button
                  outlined
                  className="w-[138px] text-sm flex gap-x-2 items-center justify-center"
                >
                  <BsHandbag className="text-base" />
                  Add to Card
                </Button>
                <Button
                  onClick={() => setPreviewOpen(false)}
                  className="h-11 flex-1 flex gap-x-2 items-center justify-center text-sm"
                >
                  <IoCheckmark className="text-base" /> Proceed to Checkout
                </Button>
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
      <Modal
        show={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        panelClassName="w-[780px] px-0"
      >
        <div className="flex items-center justify-between pb-4 px-4">
          <p className="text-black text-sm font-bold">Order&apos;s</p>
          <button onClick={() => setCheckoutOpen(false)}>
            <IoMdClose className="text-2xl" />
          </button>
        </div>
        <div className="">
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[40%] pl-6">
                  Product Name
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                  Submit Date
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                  Quantity
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-4 w-[40%] pl-6">
                  <p className="text-xs text-success">Business Card</p>
                  <p className="text-sm text-neutral-600 font-semibold">
                    350 Gsm Matt Lamination
                  </p>
                </td>
                <td className="py-4 w-[20%]">
                  <p className="text-[13px]/[19px] text-neutral-500 uppercase">
                    02 SEP 2023
                  </p>
                  <p className="text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                    21:13
                  </p>
                </td>
                <td className="py-4 text-neutral-500 text-sm w-[20%]">1000</td>
                <td className="py-4 text-neutral-500 text-sm w-[20%]">
                  150.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3.5 flex gap-x-4 justify-end">
          <div className="w-[279px] h-10 flex items-center justify-between border border-[#C3C4FE] py-3 px-4 rounded-lg">
            <p className="text-xs text-neutral-800 font-semibold">
              Estimated (Exc. Vat)
            </p>
            <h5 className="text-primary font-bold">300.00 AED</h5>
          </div>
          <Button
            onClick={() => setCheckoutOpen(false)}
            className="h-11 w-[203px] flex gap-x-2 items-center justify-center text-sm"
          >
            <IoCheckmark className="text-base" /> Proceed to Checkout
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
