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

const initialProducts = [
  {
    id: 0o1,
    title: '',
    name: '',
    quantity: 1000,
    amount: '150.00',
  },
  {
    id: 0o2,
    title: '',
    name: '',
    quantity: 1000,
    amount: '150.00',
  },
];

const Cart = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isAllChecked, setAllChecked] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isFilePreviewOpen, setFilePreviewOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const handleChecked = (i: number) => {
    const newSelected = selected.includes(i)
      ? selected.filter((item) => item !== i)
      : [...selected, i];

    setSelected(newSelected);
    setAllChecked(newSelected.length === products.length);
  };

  const handleSelectAll = (checked: boolean) => {
    setAllChecked(checked);
    setSelected(checked ? products.map((_, index) => index) : []);
  };

  const handleDelete = (i: number) => {
    const filteredProducts = products.filter((_, index) => index !== i);
    setProducts(filteredProducts);

    if (selected.includes(i)) {
      setSelected(selected.filter((item) => item !== i));
    }
  };

  const handleDeleteSelected = () => {
    const filteredProducts = products.filter(
      (_, index) => !selected.includes(index)
    );
    setProducts(filteredProducts);
    setSelected([]);
    setAllChecked(false);
  };

  return (
    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
      <div className="py-3.5 px-4 sm:px-6 flex items-center justify-between">
        <h5 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-700">
          My Cart
        </h5>
        <div className="flex items-center gap-x-2 xs:gap-x-3">
          <Button
            disabled={selected.length < 1}
            outlined
            onClick={handleDeleteSelected}
            className="h-8 sm:h-9 w-20 sm:w-[90px] md:w-[100px] py-0 flex items-center gap-x-2.5 border-[#EAECF0] text-xs md:!text-sm font-semibold"
          >
            <FiTrash2 className="text-lg md:text-xl" /> Delete
          </Button>
          <Button
            onClick={() => setCheckoutOpen(true)}
            disabled={selected.length < 1}
            className="h-8 md:h-10 w-28 xs:w-32 sm:w-[140px] md:w-[169px] py-0 flex gap-x-1 sm:gap-x-2 px-0 items-center justify-center text-xs md:!text-sm"
          >
            <IoCheckmark className="hidden xs:block text-base" /> Proceed
            Order&apos;s
          </Button>
        </div>
      </div>
      {/* table  */}
      <div className="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[630px]">
            <thead>
              <tr className="px-6 bg-[#F9FAFB] py-3.5 text-left">
                <th className="pl-6 py-3.5 w-[10%] pr-2">
                  <CheckBox
                    checked={isAllChecked}
                    onChange={(checked) => handleSelectAll(checked)}
                  />
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[15%] sm:w-[20%] pr-2">
                  Action
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[30%] pr-2">
                  Product Name
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[20%] pr-2">
                  Submit Date
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[10%] pr-2">
                  Quantity
                </th>
                <th className="text-xs font-semibold text-[#667085] py-3.5 w-[10%] pr-2">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((pd, i) => (
                <tr key={`table_${i}`} className="border-b border-neutral-200">
                  <td className="py-4 pl-6 w-[10%] pr-2">
                    <CheckBox
                      checked={isAllChecked || selected.includes(i)}
                      onChange={(checked) => handleChecked(i)}
                    />
                  </td>
                  <td className="py-4 flex pr-2 items-center gap-x-2">
                    <button
                      onClick={() => handleDelete(i)}
                      className="size-8 md:size-10 bg-neutral-100 text-[#475467] transition-all duration-300 hover:bg-red-100 hover:text-red-600 rounded-lg flex items-center justify-center"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="size-8 md:size-10 bg-neutral-100 hover:bg-neutral-300 rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      <FileSearch />
                    </button>
                  </td>
                  <td className="py-4 w-[30%] pr-2">
                    <p className="text-xs text-success">Business Card</p>
                    <p className="text-sm text-neutral-600 font-semibold whitespace-nowrap">
                      350 Gsm Matt Lamination
                    </p>
                  </td>
                  <td className="py-4 w-[20%] pr-2">
                    <p className="text-[13px]/[19px] text-neutral-500 uppercase">
                      02 SEP 2023
                    </p>
                    <p className="text-[13px]/[19px] text-neutral-500 font-semibold uppercase">
                      21:13
                    </p>
                  </td>
                  <td className="py-4 text-neutral-500 text-sm w-[10%] pr-2">
                    1000
                  </td>
                  <td className="py-4 text-neutral-500 text-sm w-[10%] pr-2">
                    150.00
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
      {/* order details  */}
      <Modal show={isPreviewOpen} onClose={() => setPreviewOpen(true)}>
        <div className="flex items-center justify-between pb-4">
          <p className="text-black text-sm font-bold">Preview</p>
          <button onClick={() => setPreviewOpen(false)}>
            <IoMdClose className="text-xl md:text-2xl" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-y-5 sm:gap-y-0 sm:gap-x-2 md:gap-x-4">
          <div className="w-full flex-1 border border-neutral-300 bg-white rounded-xl overflow-hidden">
            <div className="px-4 lg:px-5">
              <div className="flex items-center py-4 border-b border-[#E6E6E6]">
                <div className="flex-1">
                  <p className="text-xs font-medium text-success">
                    Business Card
                  </p>
                  <h4 className="text-black font-semibold text-sm lg:text-base">
                    350 Gsm Matt Lamination
                  </h4>
                </div>
                <button>
                  <FiEdit className="text-lg lg:text-xl leading-none text-[#667085]" />
                </button>
              </div>
              <div className="space-y-4 lg:space-y-[18px] pt-4 lg:pt-6 pb-6 lg:pb-8">
                {checkoutData.map((data, i) => (
                  <div
                    key={`data_${i}`}
                    className="flex items-center justify-between"
                  >
                    <p className="text-xs sm:text-sm font-medium text-neutral-400">
                      {data.title}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-neutral-600">
                      {data.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-3 lg:py-3.5 px-4 lg:px-6 bg-neutral-50 flex items-center justify-between">
              <p className="text-xs lg:text-sm font-bold text-neutral-800">
                Total (Exc. Vat)
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-semibold sm:font-bold text-primary">
                150.00 AED
              </p>
            </div>
          </div>
          <div className="w-full sm:w-[54%] bg-white">
            <div className="border rounded-lg border-neutral-200 px-4 lg:px-6 pt-4 pb-5 lg:pb-7">
              <h5 className="text-black font-semibold text-sm lg:text-base">
                File Preview
              </h5>
              <div className="mt-2">
                {uploadedFiles.length > 0 &&
                  uploadedFiles.map((file, i) => (
                    <div
                      key={`file_${i}`}
                      className="bg-white rounded-lg pt-4 border-neutral-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-neutral-700">
                          <FileAttach className="size-5 lg:size-6" />
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
                          className="size-8 lg:size-10 rounded-lg transition-all duration-300 hover:scale-95 bg-neutral-50 hover:bg-neutral-200 flex items-center justify-center"
                        >
                          <FiEye className="text-lg lg:text-xl text-neutral-500" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-3 md:p-4 border border-neutral-200 rounded-lg bg-neutral-50 mt-2 md:mt-4">
              <div className="flex items-center justify-between">
                <h6 className="text-xs lg:text-sm font-bold text-neutral-800">
                  Total (Exc. Vat)
                </h6>
                <h4 className="text-xs sm:text-base md:text-lg lg:text-xl font-bold text-primary">
                  150.00 AED
                </h4>
              </div>
              <div className="flex justify-end sm:justify-start items-center gap-x-3 mt-4">
                <Button
                  outlined
                  className=" w-28 lg:w-[138px] py-2 lg:py-2.5 text-xs lg:text-sm flex gap-x-2 items-center justify-center"
                >
                  <BsHandbag className="text-sm lg:text-base" />
                  Add to Card
                </Button>
                <Button
                  onClick={() => setPreviewOpen(false)}
                  className="h-9 lg:h-11 flex-1 max-w-48 flex gap-x-1 md:gap-x-2 px-0 items-center justify-center text-xs md:text-sm lg:text-sm"
                >
                  <IoCheckmark className="text-base" /> Proceed to Checkout
                </Button>
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
        <div className="p-4 bg-white h-[85vh] overflow-y-scroll scrollbar-thin">
          <div className="w-full h-[624px] relative">
            <Image
              src={'/temp-banner.png'}
              className="object-fill md:object-cover"
              fill
              alt="preview"
            />
          </div>
        </div>
      </Modal>
      {/* checkout modal  */}
      <Modal
        show={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        panelClassName="w-[780px] px-0"
      >
        <div className="flex items-center justify-between pb-4 px-4">
          <p className="text-black text-sm font-bold">Order&apos;s</p>
          <button onClick={() => setCheckoutOpen(false)}>
            <IoMdClose className="text-xl lg:text-2xl" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[530px]">
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
        <div className="px-4 md:px-6 py-3.5 flex flex-col xs:flex-row gap-y-4 xs:gap-y-0 xs:gap-x-4 justify-end">
          <div className=" xs:w-[210px] sm:w-[279px] h-9 md:h-10 flex items-center justify-between gap-x-2 border border-[#C3C4FE] py-3 px-4 rounded-lg">
            <p className="text-tiny sm:text-xs text-neutral-800 font-semibold">
              Estimated (Exc. Vat)
            </p>
            <h5 className="text-primary font-semibold sm:font-bold text-xs sm:text-sm md:text-base">
              300.00 AED
            </h5>
          </div>
          <Button
            onClick={() => setCheckoutOpen(false)}
            className="h-9 lg:h-11 flex-1 xs:max-w-48 flex gap-x-1 md:gap-x-2 px-0 items-center justify-center text-xs md:text-sm lg:text-sm"
          >
            <IoCheckmark className="text-base" /> Proceed to Checkout
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
