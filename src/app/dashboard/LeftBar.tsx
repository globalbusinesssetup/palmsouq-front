'use client';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiBell, FiLoader, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { LiaUserEditSolid } from 'react-icons/lia';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { Location, Bag } from '@/components';
import { FaBarsStaggered } from 'react-icons/fa6';
import useAuth from '@/hooks/useAuth';
import { UserData } from '@/types';

export const avatar = '/avatar.png';

const links = [
  {
    title: 'My cart',
    url: '/dashboard/cart',
    icon: <FiShoppingBag />,
  },
  {
    title: 'My order’s',
    url: '/dashboard/orders',
    icon: <Bag className="w-[18px] md:w-5 lg:w-6" />,
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
    icon: <Location className="w-[18px] md:w-5 lg:w-6" />,
  },
  {
    title: 'Notifications',
    url: '/dashboard/notifications',
    icon: <FiBell />,
  },
];

const LeftBar = ({ user }: { user: UserData | undefined }) => {
  const pathname = usePathname();
  const [isExpand, setExpand] = useState(false);
  const { logOut, isLoggedIn } = useAuth();

  return (
    <>
      <aside
        className={`w-14 sm:w-[150px] md:w-[200px] lg:w-[264px] fixed left-2 top-2 lg:left-5 lg:top-5 z-50 h-[calc(100vh-15px)] lg:h-[calc(100vh-40px)] bg-white rounded md:rounded-xl border border-neutral-200 overflow-hidden mb-2 transition-all duration-300 ${
          isExpand && 'w-[150px]'
        }`}
      >
        <div className="hidden py-6 bg-gradient-to-l to-[#002169] from-[#002169B5] md:flex flex-col items-center">
          <div className="size-12 lg:size-16 rounded-full overflow-hidden border-[1.5px] border-white relative">
            <Image
              src={avatar}
              alt="user avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center mt-3">
            <h6 className="text-sm font-semibold text-white capitalize">{`${user?.first_name} ${user?.last_name}`}</h6>
            <p className="text-sm text-white">{user?.email}</p>
            <p className="text-sm text-white">{user?.phone}</p>
          </div>
        </div>
        <nav className=" p-2 md:p-4 space-y-1 h-[calc(100%-58px)] md:h-[calc(100%-232px)] lg:h-[calc(100%-256px)] overflow-auto scrollbar-thin">
          <button
            onClick={() => setExpand(!isExpand)}
            className={`w-full flex sm:hidden items-center justify-center py-3 text-lg text-neutral-600 ${
              isExpand && '!justify-end pr-3'
            }`}
          >
            <FaBarsStaggered />
          </button>
          {links.slice(0, 2).map((link, i) => (
            <LinkButton
              isActive={link.url === pathname}
              key={`link_${i}`}
              url={link.url}
              title={link.title}
              icon={link.icon}
              isExpanded={isExpand}
            />
          ))}
          <div className="pt-2 md:pt-3 space-y-1">
            {links.slice(2, 4).map((link, i) => (
              <LinkButton
                isActive={link.url === pathname}
                key={`link_${i}`}
                url={link.url}
                title={link.title}
                icon={link.icon}
                isExpanded={isExpand}
              />
            ))}
          </div>
          <div className="pt-4 md:pt-6 lg:pt-10 space-y-1">
            <p className="hidden sm:block text-xs md:text-base font-medium text-neutral-400 pb-2 pl-2 md:pl-4 lg:pl-8">
              Account Setting&apos;s
            </p>
            {settingLinks.map((link, i) => (
              <LinkButton
                isActive={link.url === pathname}
                key={`link_${i}`}
                url={link.url}
                title={link.title}
                icon={link.icon}
                isExpanded={isExpand}
              />
            ))}
          </div>
        </nav>
        <div className="pt-2 px-2 md:px-4 pb-4">
          <button
            disabled={!isLoggedIn}
            onClick={() => logOut()}
            className="w-full h-8 sm:h-10 lg:h-12 text-[#344054] text-sm lg:text-base transition-all duration-300 hover:bg-neutral-200 font-semibold flex items-center justify-center gap-x-2 bg-neutral-50 rounded-lg"
          >
            <FiLogOut className="text-sm lg:text-base" />{' '}
            <span className={`hidden sm:inline ${isExpand && '!inline'}`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>
      {isExpand && (
        <div
          onClick={() => setExpand(false)}
          className="fixed top-0 left-0 w-full h-screen bg-black/10 overflow-hidden z-20"
        ></div>
      )}
    </>
  );
};

export default LeftBar;

const LinkButton = ({
  isActive,
  isExpanded,
  url,
  title,
  icon,
}: {
  isActive?: boolean;
  isExpanded?: boolean;
  url: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <Link
      href={url}
      className={`py-2 sm:pl-2 md:pl-4 lg:pl-8 flex items-center justify-center sm:justify-start gap-x-3 text-neutral-600 text-lg md:text-xl lg:text-2xl font-semibold hover:bg-primary/10 transition-all duration-300 rounded-md ${
        isActive && 'bg-primary/5 text-primary'
      } ${isExpanded && '!justify-start !pl-2'}`}
    >
      {icon}{' '}
      <span
        className={`text-xs md:text-sm lg:text-base hidden sm:inline-block ${
          isExpanded && '!inline-block'
        }`}
      >
        {title}
      </span>
    </Link>
  );
};
