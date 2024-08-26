'use client';
import {
  Button,
  FileAttach,
  Footer,
  Header,
  Modal,
  PdfPreview,
} from '@/components';
import React, { useState, useRef, useEffect } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { FiEdit, FiEye, FiTrash2, FiUpload } from 'react-icons/fi';
import { FileDrop } from 'react-file-drop';
import { formatFileSize } from '@/utils/helper';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { BsHandbag } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

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

const Checkout = () => {
  const router = useRouter();
  const fileInputRef = useRef<any>(null);
  const [selected, setSelected] = useState('upload-file');
  const [uploadedFiles, setFiles] = useState<File[]>([]);
  const [filePreviews, setPreview] = useState<string[]>([]);
  const [isFilePreviewOpen, setFilePreviewOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length > 0 && selected === 'hire-designer') {
      setSelected('upload-file');
    }
  }, [uploadedFiles, selected]);

  const onTargetClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileDrop = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) => file.type === 'application/pdf'
      );
      if (newFiles.length + uploadedFiles.length <= 2) {
        setFiles([...uploadedFiles, ...newFiles]);
        setPreview((prev) => [...prev, URL.createObjectURL(newFiles[0])]);
      } else {
        alert('You can upload a maximum of 2 files.');
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileDrop(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(uploadedFiles.filter((_, i) => i !== index));
    setPreview(filePreviews.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen pt-14 pb-10 px-4">
        <div className="container mx-auto lg:flex items-start space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-6">
          <div className="flex-1 bg-white rounded-xl border-neutral-300 px-4 sm:px-6 py-3 sm:py-4 border">
            <h2 className="text-lg lg:text-xl text-neutral-900 font-semibold text-center">
              Choose your file type
            </h2>
            <div className="mt-4 xs:flex items-center gap-x-3 space-y-3 xs:space-y-0">
              <button
                onClick={() => setSelected('upload-file')}
                className={`flex-1 text-left flex items-center justify-center border rounded-lg w-full xs:w-auto h-16 sm:h-[98px] transition-all duration-300 ${
                  selected === 'upload-file'
                    ? 'border-[#4B4EFC] bg-neutral-50'
                    : 'border-neutral-300'
                }`}
              >
                <div className="">
                  <div className="flex items-center gap-x-3 xs:gap-x-5 sm:gap-x-10">
                    <h6 className="text-primary font-semibold text-xs sm:text-sm xl:text-base">
                      Upload File
                    </h6>
                    <span className="px-1 sm:px-2 py-0.5 bg-neutral-100 rounded-full text-tiny sm:text-xs font-medium text-[#363F72]">
                      Free Review
                    </span>
                  </div>
                  <p className="mt-1 text-tiny sm:text-xs text-primary">
                    Upload Your Design
                  </p>
                </div>
              </button>
              <button
                disabled={uploadedFiles.length > 0}
                onClick={() => setSelected('hire-designer')}
                className={`flex-1 flex text-left items-center disabled:opacity-40 justify-center border rounded-lg w-full xs:w-auto h-16 sm:h-[98px] transition-all duration-300 ${
                  selected === 'hire-designer'
                    ? 'border-[#4B4EFC] bg-neutral-50'
                    : 'border-neutral-300'
                }`}
              >
                <div className="">
                  <div className="flex items-center gap-x-3 xs:gap-x-5 sm:gap-x-10">
                    <h6 className="text-primary font-semibold text-xs sm:text-sm xl:text-base">
                      Hire Designer
                    </h6>
                    <span className="px-1 sm:px-2 py-0.5 bg-[#ECFDF3] rounded-full text-tiny sm:text-xs font-medium text-success">
                      0.00 AED
                    </span>
                  </div>
                  <p className="mt-1 text-tiny sm:text-xs text-primary">
                    Create Personalized Design
                  </p>
                </div>
              </button>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-2 xs:p-3 lg:p-4 bg-neutral-100 rounded-xl space-y-3">
                {uploadedFiles.map((file, i) => (
                  <div
                    key={`file_${i}`}
                    className="p-3 lg:p-4 bg-white rounded-lg border- border-neutral-300 flex items-center justify-between"
                  >
                    <div className="flex flex-1 items-center gap-x-4">
                      <div className="size-8 sm:size-10 rounded-full flex items-center justify-center bg-neutral-700">
                        <FileAttach className="w-5 sm:w-6" />
                      </div>
                      <div className="">
                        <p className="text-[#111827] text-sm md:text-base">
                          {file.name}
                        </p>
                        <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2 sm:gap-x-4">
                      <button
                        onClick={() => setFilePreviewOpen(true)}
                        className="size-6 xs:size-8 lg:size-10 rounded-full transition-all duration-300 hover:scale-95 bg-neutral-50 hover:bg-neutral-200 flex items-center justify-center"
                      >
                        <FiEye className="xs:text-xl lg:text-2xl text-neutral-500" />
                      </button>
                      <button
                        onClick={() => removeFile(i)}
                        className="size-6 xs:size-8 lg:size-10 rounded-full transition-all duration-300 hover:scale-95 bg-[#FEF2F2] hover:bg-red-200 flex items-center justify-center"
                      >
                        <FiTrash2 className="xs:text-xl lg:text-2xl text-[#EF4444]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <FileDrop
              onDrop={(files, event) => handleFileDrop(files)}
              className={`flex flex-col items-center justify-center bg-neutral-50 border border-black border-dashed rounded-lg mt-4 transition-all duration-500 overflow-hidden ${
                uploadedFiles.length > 0 ? 'h-[156px]' : 'h-52 xs:h-[250px]'
              }`}
            >
              <div className="size-10 lg:size-12 mx-auto flex items-center justify-center rounded-full bg-neutral-100">
                <FiUpload className="text-lg text-neutral-700" />
              </div>
              <p className="text-neutral-500 mt-3 text-sm lg:text-base">
                Drag & Drop or Click to
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={onTargetClick}
                  className="text-white bg-neutral-700 mt-2 w-[153px] h-8 text-xs lg:text-sm py-0"
                >
                  Choose File
                </Button>
              </div>
            </FileDrop>
            <div className="flex items-center justify-between mt-4">
              <p className="text-tiny sm:text-xs text-neutral-400 font-medium">
                <span className="font-semibold text-neutral-700">Format:</span>{' '}
                Submit your design file in (PDF) format.
              </p>
              <Button
                outlined
                className="text-neutral-900 h-[26px] w-[139px] py-0 text-[10px]/[13px] lg:text-[10px]/[13px] rounded-full flex items-center justify-center gap-x-1.5 border-[0.42px] border-[#EF4444] hover:bg-error"
              >
                <FiUpload className="text-xs" />
                Guide Template
              </Button>
            </div>
          </div>
          <div className="lg:w-[336px]">
            <div className="w-full border border-neutral-300 bg-white rounded-xl overflow-hidden">
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
                <div className="space-y-6 pt-6 pb-8">
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
                <p className="sm:text-lg font-bold text-primary">150.00 AED</p>
              </div>
            </div>
            <Button
              onClick={() => setConfirmationOpen(true)}
              disabled={uploadedFiles.length < 1}
              className="h-11 mt-5 flex gap-x-2 items-center justify-center"
            >
              <IoCheckmark /> Confirm details
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <input
        onChange={handleFileInputChange}
        ref={fileInputRef}
        accept="application/pdf"
        type="file"
        className="hidden"
      />
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
            <PdfPreview fileUrl={filePreviews[0]} />
          </div>
        </div>
      </Modal>
      <Modal
        show={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <div className="flex items-center justify-between pb-4">
          <p className="text-black text-sm font-bold">Confirmation</p>
          <button onClick={() => setConfirmationOpen(false)}>
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
                            {formatFileSize(file.size)}
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
                  onClick={() => {
                    setConfirmationOpen(false);
                    router.push('/dashboard/cart');
                  }}
                  outlined
                  className="w-[138px] text-sm flex gap-x-2 items-center justify-center"
                >
                  <BsHandbag className="text-base" />
                  Add to Card
                </Button>
                <Button
                  onClick={() => {
                    setConfirmationOpen(false);
                    router.push('/dashboard/cart');
                  }}
                  className="h-11 flex-1 flex gap-x-2 items-center justify-center text-sm"
                >
                  <IoCheckmark className="text-base" /> Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
