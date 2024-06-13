'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiBell, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { LiaUserEditSolid } from 'react-icons/lia';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { Location } from '@/components';

export const avatar =
  'https://s3-alpha-sig.figma.com/img/0a41/0cef/bfab589bdae4d108dbdbd1d5294ae731?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMQ3IlA3DCEF5yeUIKW8bTFw54QE2hfEXo3ydvn5~IwbU-RJ3zHAO7sUxBGKFGa7Iqr8NqP9GhW6AcQU9temWgyC4DdwdBtto81T3kJeMUdH9c4Of9ZoPyI~CKDxkFLq3QxA5jKzlt0aEQc2OrUX37~GqVsLPmv0XpsqKUgc74-~6ZbiMR74y0a4Eq6ziQqdTGGBoW2EpPVEBUDci8rdau2KPDvXz1TU6uSgxPkVw1CY2edjHZsT8I40GNOqvshAm4Qy5nkBvJGNe46cZ9u2a3ARLVq3iU60YLo3PNvwwJXG5fdlEzM1xhb1A2kUMYBmnJpoKGrRH~twcxSB-IRVTA__';

const links = [
  {
    title: 'My cart',
    url: '/dashboard/cart',
    icon: <FiShoppingBag />,
  },
  {
    title: 'My order’s',
    url: '/dashboard/orders',
    icon: <FiShoppingBag />,
  },
  {
    title: 'My Wallet',
    url: '/dashboard/wallet',
    icon: <IoWalletOutline />,
  },
  {
    title: 'Payments',
    url: '/dashboard/payments',
    icon: <IoCardOutline />,
  },
];
const settingLinks = [
  {
    title: 'Edit Profile',
    url: '/dashboard/profile',
    icon: <LiaUserEditSolid />,
  },
  {
    title: 'Password',
    url: '/dashboard/password',
    icon: <HiOutlineLockClosed />,
  },
  {
    title: `Shipping's`,
    url: '/dashboard/shippings',
    icon: <Location />,
  },
  {
    title: 'Notifications',
    url: '/dashboard/notifications',
    icon: <FiBell />,
  },
];

const LeftBar = () => {
  const pathname = usePathname();

  return (
    <section className="w-[264px] h-[calc(100vh-50px)] relative bg-white rounded-xl border border-neutral-200 overflow-hidden mb-2">
      <div className="py-6 bg-gradient-to-l to-[#002169] from-[#002169B5] flex flex-col items-center">
        <div className="size-16 rounded-full overflow-hidden border-[1.5px] border-white relative">
          <Image src={avatar} alt="user avatar" fill className="object-cover" />
        </div>
        <div className="text-center mt-3">
          <h6 className="text-sm font-semibold text-white">Jhon Millar</h6>
          <p className="text-sm text-white">{'info@printcraft.ae'}</p>
          <p className="text-sm text-white">{'+971 55 1234567'} </p>
        </div>
      </div>
      <nav className="p-4 space-y-1 h-[calc(100%-256px)] overflow-auto scrollbar-thin">
        {links.slice(0, 2).map((link, i) => (
          <LinkButton
            isActive={link.url === pathname}
            key={`link_${i}`}
            url={link.url}
            title={link.title}
            icon={link.icon}
          />
        ))}
        <div className="pt-3 space-y-1">
          {links.slice(2, 4).map((link, i) => (
            <LinkButton
              isActive={link.url === pathname}
              key={`link_${i}`}
              url={link.url}
              title={link.title}
              icon={link.icon}
            />
          ))}
        </div>
        <div className="pt-10 space-y-1">
          <p className="text-base font-medium text-neutral-400 pb-2 pl-8">
            Account Setting&apos;s
          </p>
          {settingLinks.map((link, i) => (
            <LinkButton
              isActive={link.url === pathname}
              key={`link_${i}`}
              url={link.url}
              title={link.title}
              icon={link.icon}
            />
          ))}
        </div>
      </nav>
      <div className="pt-2 px-4 pb-4">
        <button className="w-full h-12 text-[#344054] transition-all duration-300 hover:bg-neutral-200 font-semibold flex items-center justify-center gap-x-2 bg-neutral-50 rounded-lg">
          <FiLogOut className="text-base" /> Sign Out
        </button>
      </div>
    </section>
  );
};

export default LeftBar;

const LinkButton = ({
  isActive,
  url,
  title,
  icon,
}: {
  isActive?: boolean;
  url: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <Link
      href={url}
      className={`py-2 pl-8 flex items-center gap-x-3 text-neutral-600 text-2xl font-semibold hover:bg-primary/10 transition-all duration-300 rounded-md ${
        isActive && 'bg-primary/5 text-primary'
      }`}
    >
      {icon} <span className="text-base">{title}</span>
    </Link>
  );
};
