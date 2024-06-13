'use client';
import { Button, CheckBox } from '@/components';
import { notificationSettings } from '@/constants';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Notifications = () => {
  const [notifications, setNotification] = useState(notificationSettings);
  const [isPhoneAllow, setPhoneAllow] = useState(true);
  const [isEmailAllow, setEmailAllow] = useState(true);

  const handleOnChange = (index: number) => {
    const updatedNotifications = notifications.map((ntf, i) =>
      i === index ? { ...ntf, value: !ntf.value } : ntf
    );
    setNotification(updatedNotifications);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl py-4 px-6">
      <h4 className="text-lg text-neutral-900 font-semibold">
        Notification settings
      </h4>
      <p className="text-sm text-enutral-600 mt-1">
        Select the kind of notification you get about your activities and
        recommendations
      </p>
      <div className="mt-6 flex gap-x-8 gap-y-2 flex-wrap max-w-[672px] select-none">
        {notifications.map((ntfs, i) => (
          <label
            onClick={() => handleOnChange(i)}
            key={`ntfs_${i}`}
            htmlFor={`ntfs_${i}`}
            className="w-[calc(50%-16px)] flex items-center gap-x-3 text-[#101828] cursor-pointer"
          >
            <CheckBox
              outlined
              id={`ntfs_${i}`}
              checked={ntfs.value}
              onChange={() => handleOnChange(i)}
            />
            {ntfs.label}
          </label>
        ))}
      </div>
      <div className="mt-8">
        <h4 className="text-lg text-neutral-900 font-semibold pb-4 border-b border-neutral-200">
          Channels
        </h4>
        <div className="flex items-center gap-x-6 mt-6 max-w-[664px] select-none">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#344054]">Mobile number</p>
            <label
              onClick={() => setPhoneAllow((prev) => !prev)}
              className="flex items-center gap-x-3 text-[#101828] cursor-pointer p-6 bg-neutral-100 rounded-lg mt-3"
            >
              <CheckBox
                checked={isPhoneAllow}
                outlined
                onChange={() => setPhoneAllow((prev) => !prev)}
              />
              {'+971 55 6265479'}
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#344054]">Email address</p>
            <label
              onClick={() => setEmailAllow((prev) => !prev)}
              className="flex items-center gap-x-3 text-[#101828] cursor-pointer p-6 bg-neutral-100 rounded-lg mt-3"
            >
              <CheckBox
                checked={isEmailAllow}
                outlined
                onChange={() => setEmailAllow((prev) => !prev)}
              />
              {'info.yallaprints@gmail.com'}
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-3 justify-end mt-8">
        <Button type="submit" className="w-[127px] text-sm font-semibold">
          Save changes
        </Button>
        <Button
          type="submit"
          onClick={() => setNotification(notificationSettings)}
          outlined
          className="w-[112px] text-sm font-semibold border-[#D0D5DD] flex items-center justify-center gap-x-2"
        >
          <IoClose className="text-lg" /> Discard
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
