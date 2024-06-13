import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { footerLinks, paymentIcons } from '@/constants';

const quickLinks = [
  {
    title: 'Legal Notice',
    url: '#',
  },
  {
    title: 'Terms of Use',
    url: '#',
  },
  {
    title: 'Privacy Policy',
    url: '#',
  },
  {
    title: 'Return Policy',
    url: '#',
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto py-[50px]">
        <div className="flex flex-row flex-wrap items-center justify-between pb-6">
          {footerLinks.map((footerLink, i) => (
            <nav key={`footer_${i}`} className="space-y-2">
              <h6 className="text-neutral-400 text-sm font-semibold pb-1">
                {footerLink.title}
              </h6>
              {footerLink.links.map((link, i) => (
                <Link
                  key={`link_${i}`}
                  href="#"
                  className="text-sm font-medium text-neutral-200 block"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          ))}
          <div className="pl-2.5">
            <h3 className="text-xl text-neutral-300 font-medium">
              Payment Methods
            </h3>
            <div className="flex items-center mt-2 gap-x-1">
              {paymentIcons.map((icon, i) => (
                <Image
                  key={i}
                  src={icon}
                  width={34}
                  height={23}
                  className="rounded"
                  alt="payment icon"
                />
              ))}
            </div>
            <ul className="mt-4 text-[#E1E1FE] list-disc pl-5">
              <li>Pay on Delivery</li>
              <li>Make a Bank Transfer</li>
              <li>We accept Cheques</li>
            </ul>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-l to-[#FDDE5C] from-[#70DB96]" />
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-end gap-x-2">
            <Image src="/footer-logo.svg" width={127} height={32} alt="logo" />
            <p className="text-base text-neutral-200">
              Copywrite 2023, All right reserved.
            </p>
          </div>
          <nav className="space-x-6">
            {quickLinks.map((link, i) => (
              <Link
                key={`quickL_${i}`}
                href={link.url}
                className="text-base font-medium text-white hover:text-white/65 hover:scale-90 underline transition-all duration-300"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
