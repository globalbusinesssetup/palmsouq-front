'use client';
import { Button, Input, InputPhoneNumber, Step } from '@/components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoCloudUploadOutline } from 'react-icons/io5';

const GetEstimation = () => {
  const router = useRouter();
  const { control } = useForm();
  const uploadRef = useRef<any>(null);
  const [currentStep, setStep] = useState(0);
  const [file, setFile] = useState<File | null>();
  const [isSubmited, setSubmited] = useState(false);

  const handleFileDrop = (file: File | null) => {
    setFile(file);
  };

  return (
    <main className="bg-[#FCFCFD] px-4">
      {!isSubmited ? (
        <>
          <div className="max-w-[700px] mx-auto mt-32 mb-10">
            <h2 className="text-center text-primary text-xl sm:text-2xl lg:text-3xl font-semibold">
              Estimate Project Cost
            </h2>
            <p className="text-center text-neutral-500 mt-2 text-sm sm:text-base">
              Please fill in the form to receive a quote for your requirements.
            </p>
            <div className="mt-8 px-6 md:px-10 py-5 md:py-8 rounded-xl md:rounded-2xl shadow-md border border-[#D0D5DD]">
              <div className="flex items-center justify-center gap-x-1.5 xs:gap-x-3 sm:gap-x-[18px] pb-6 border-b border-neutral-200">
                {Array(4)
                  .fill(' ')
                  .map((_, i) => (
                    <Step
                      key={`step_${i}`}
                      index={i}
                      isActive={currentStep === i}
                      isCompleted={currentStep > i || currentStep === 4 - 1}
                      circleClassName="size-6 xs:size-7 sm:size-[34px]"
                      className={
                        i === 3
                          ? 'min-w-fit gap-x-0'
                          : 'min-w-[80px] xs:min-w-[100px] sm:min-w-[150px] gap-x-1.5 xs:gap-x-3 sm:gap-x-4'
                      }
                    />
                  ))}
              </div>
              {currentStep === 0 ? (
                <div className="mt-10">
                  <h4 className="text-black xs:text-lg sm:text-xl font-semibold">
                    Contact details
                  </h4>
                  <p className="text-neutral-500 mt-2 text-xs xs:text-sm sm:text-base">
                    Please provide your current contact information below
                  </p>
                  <div className="mt-8 sm:grid grid-cols-2 items-center sm:gap-x-6 space-y-2 sm:space-y-0">
                    <Input
                      control={control}
                      name="full_name"
                      label="Full name *"
                      placeholder="Enter your full name"
                    />
                    <Input
                      control={control}
                      name="title"
                      label="Title"
                      placeholder="Enter your title"
                    />
                    <Input
                      control={control}
                      name="company_name"
                      label="Company name"
                      placeholder="Enter your company name"
                      wrapClassName="col-span-2"
                    />
                    <Input
                      control={control}
                      name="email"
                      label="Email Address *"
                      placeholder="Enter your email Address"
                    />
                    <InputPhoneNumber
                      control={control}
                      name="phone"
                      label="Phone number"
                    />
                  </div>
                </div>
              ) : currentStep === 1 ? (
                <div className="mt-10">
                  <h4 className="text-black text-lg sm:text-xl font-semibold">
                    Project information
                  </h4>
                  <p className="text-neutral-500 mt-2 text-sm sm:text-base">
                    Please Share your project details below.
                  </p>
                  <div className="mt-8">
                    <div className="sm:grid grid-cols-2 gap-x-5 space-y-2 sm:space-y-0">
                      <Input
                        name="product_name"
                        control={control}
                        label="Product Name *"
                        placeholder="Enter Product Name"
                      />
                      <Input
                        name="size"
                        control={control}
                        label="Size *"
                        placeholder="Enter size"
                      />
                      <Input
                        name="material"
                        control={control}
                        label="Material / Paper *"
                        placeholder="Enter Material / Paper"
                      />
                      <Input
                        name="quantity"
                        control={control}
                        label="Total Quantity *"
                        placeholder="Enter total quantity"
                      />
                      <div className="col-span-2">
                        <label htmlFor="desc" className="label">
                          Additional Details
                        </label>
                        <textarea
                          id="desc"
                          className="custom-input mt-1.5 text-sm sm:text-base"
                          placeholder="Explain additional details of the project"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentStep === 2 ? (
                <div className="mt-10">
                  <h4 className="text-black text-xl font-semibold">
                    Project Deadline
                  </h4>
                  <p className="text-neutral-500 mt-2">
                    Please provide the project timeline and desire budget.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3 sm:gap-y-0 mt-8">
                    <Input
                      type="date"
                      control={control}
                      name="start_date"
                      label="Desired Start Date *"
                      wrapClassName="flex-1"
                    />
                    <Input
                      control={control}
                      name="budget"
                      label="Desired Budget *"
                      wrapClassName="flex-1"
                      defaultValue={0.0}
                    />
                  </div>
                  <FileDrop
                    onDrop={(files, e) => handleFileDrop(files && files[0])}
                    className={`flex flex-col items-center justify-center border-2 py-5 bg-[#F1F1F1] border-[#384EB74D] border-dashed rounded-lg mt-5 sm:mt-8 transition-all duration-500 overflow-hidden `}
                  >
                    <div className="size-12 mx-auto flex items-center justify-center">
                      <IoCloudUploadOutline className="text-4xl text-neutral-700" />
                    </div>
                    <div className="text-[#0F0F0F] font-bold mt-3 text-xs">
                      Drag & Drop or Click to{' '}
                      <button
                        onClick={() => uploadRef.current?.click()}
                        className="text-[#483EA8] underline"
                      >
                        Browse
                      </button>
                    </div>
                  </FileDrop>
                  <ul className="pl-4 list-disc list-outside">
                    <li className="text-xs text-neutral-500 mt-2">
                      Please upload the printable artwork if available or
                      alternatively upload any similar samples
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                  <Image
                    src={'/icons/submit.svg'}
                    width={100}
                    height={89}
                    alt="Check icon"
                    className="mx-auto"
                  />
                  <h2 className="text-lg sm:text-xl font-semibold text-black mt-6">
                    You&apos;re good to go
                  </h2>
                  <p className="text-neutral-500 text-center max-w-[390px] mt-2 text-sm sm:text-base">
                    Please submit your details, We look forward to assisting you
                    with your project.
                  </p>
                  <Button
                    onClick={() => setSubmited(true)}
                    className="max-w-[365px] mt-8"
                  >
                    Submit
                  </Button>
                  <button
                    onClick={() => setStep((prev) => prev - 1)}
                    disabled={currentStep === 0}
                    className="text-sm font-semibold text-neutral-500 flex items-center justify-center gap-x-2 mt-4"
                  >
                    <IoIosArrowRoundBack className="text-2xl" /> Back to details
                  </button>
                </div>
              )}
              {currentStep < 3 && (
                <div className="flex items-center justify-between mt-10">
                  <button
                    onClick={() => setStep((prev) => prev - 1)}
                    disabled={currentStep === 0}
                    className="text-sm font-semibold text-neutral-500 flex items-center justify-center gap-x-2"
                  >
                    <IoIosArrowRoundBack className="text-2xl" /> Back
                  </button>
                  <Button
                    disabled={currentStep === 3}
                    onClick={() => setStep((prev) => prev + 1)}
                    className="w-[100px] py-1.5 sm:py-2.5"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            ref={uploadRef}
            onChange={(e) =>
              handleFileDrop(e.target.files && e.target.files[0])
            }
          />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[400px] p-8 rounded-2xl shadow-md border border-[#D0D5DD] flex flex-col text-center">
            <Image
              src={'/icons/submited.svg'}
              width={98}
              height={88}
              alt="submitted icon"
              className="mx-auto"
            />
            <h2 className="text-xl sm:text-2xl text-neutral-700 mt-6 font-semibold">
              Inquiry submitted
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Hold on tight! we&apos;ll be in touch soon.
            </p>
            <Button onClick={() => router.push('/')} className="w-full mt-8">
              Home
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default GetEstimation;
