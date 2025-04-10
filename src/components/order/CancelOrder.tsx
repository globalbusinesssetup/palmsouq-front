'use client';
import { Button, Input, Modal } from '@/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const CancelOrder = ({ isVisible, onClose, order }) => {
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<{ title: string; message: string }>({
    defaultValues: {
      title: '',
      message: '',
    },
  });

  const handleClose = () => {
    onClose();
    clearErrors();
  };

  const handleCancel = async (data: { title: string; message: string }) => {
    setIsCancelLoading(true);
    try {
      const res = await api.post(`/cancellation/cancel-order`, {
        order_id: order?.id,
        title: data?.title,
        message: data?.message,
        user_token: Cookies.get('user_token'),
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        toast.success('Order cancelled successfully');
        await queryClient.invalidateQueries({ queryKey: ['orders'] });
        await queryClient.refetchQueries({ queryKey: ['orders'] });
        reset();
        handleClose();
      }
    } catch (err) {
      toast.error('Error to cancel order');
      console.log('err =>', err);
    } finally {
      setIsCancelLoading(false);
    }
  };

  return (
    <Modal
      show={isVisible}
      panelClassName="p-0 max-w-[400px]"
      onClose={handleClose}
    >
      <div className="flex items-center justify-between bg-primary px-6 py-3">
        <p className="text-white text-sm font-bold">Cancel Order</p>
        <button onClick={handleClose}>
          <IoMdClose className="text-2xl text-white" />
        </button>
      </div>
      <form onSubmit={handleSubmit(handleCancel)} className="px-4 py-4">
        <Input
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          label="Title"
          error={errors.title}
        />
        <div className="mt-2 mb-4">
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            id="message"
            rows={4}
            className="border rounded-lg w-full focus-visible:outline-neutral-300 pl-3.5 pr-[38px] py-2.5 mt-2 text-[#667085]"
          />
          <p
            className={`text-red-500 text-xs mt-0.5 ml-0.5 min-h-4 ${
              errors.message ? 'visible' : 'invisible'
            } `}
          >
            {errors.message?.message}
          </p>
        </div>
        <Button loading={isCancelLoading} type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CancelOrder;
