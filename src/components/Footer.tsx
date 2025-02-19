import React from 'react';
import Link from 'next/link';
import { currentYear } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { Image } from './common';

const quickLinks = [
  {
    title: 'Legal Notice',
    url: '/page/legal-notice',
  },
  {
    title: 'Terms of Use',
    url: '/page/terms-of-use',
  },
  {
    title: 'Privacy Policy',
    url: '/page/privacy-policy',
  },
  {
    title: 'Refund Policy',
    url: '/page/refund-policy',
  },
];

const Footer = () => {
  const { about, payment, social, services, siteSetting } = useAuth();
  return (
    <footer className="bg-primary">
      <div className="container mx-auto py-[50px] px-4 sm:px-5">
        <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between pb-6 gap-4">
          {/* {footerLinks.map((footerLink, i) =>
            footerLink.title !== 'About' ? (
              <nav
                key={`footer_${i}`}
                className="space-y-2 text-center sm:text-left"
              >
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
            ) : (
              <nav
                key={`footer_${i}`}
                className="space-y-2 text-center sm:text-left"
              >
                <h6 className="text-neutral-400 text-sm font-semibold pb-1">
                  {footerLink.title}
                </h6>
                {about.map((link, i) => (
                  <Link
                    key={`link_${i}`}
                    href={'/page/' + link.slug}
                    className="text-sm font-medium text-neutral-200 block"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            )
          )} */}
          <nav className="space-y-2 text-center sm:text-left">
            <h6 className="text-neutral-400 text-sm font-semibold pb-1">
              About
            </h6>
            {about.map((link, i) => (
              <Link
                key={`link_${i}`}
                href={'/page/' + link.slug}
                className="text-sm font-medium text-neutral-200 block"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <nav className="space-y-2 text-center sm:text-left">
            <h6 className="text-neutral-400 text-sm font-semibold pb-1">
              Services
            </h6>
            {services.map((link, i) => (
              <Link
                key={`link_${i}`}
                href={'/page/' + link.slug}
                className="text-sm font-medium text-neutral-200 block"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <nav className="space-y-2 text-center sm:text-left">
            <h6 className="text-neutral-400 text-sm font-semibold pb-1">
              Social
            </h6>
            {social.map((l, i) => (
              <Link
                key={`link_${i}`}
                href={l.link}
                target="_blank"
                className="text-sm font-medium text-neutral-200 flex items-center justify-center sm:justify-start gap-x-2"
              >
                <Image defaultSrc={l.image} width={15} height={15} alt="s" />{' '}
                {l.title}
              </Link>
            ))}
          </nav>
          <div className="lg:pl-2.5">
            <h3 className="text-lg lg:text-xl text-neutral-300 font-medium text-center sm:text-left">
              Payment Methods
            </h3>
            <div className="flex items-center justify-center sm:justify-start mt-2 gap-x-1">
              {payment.map((l, i) => (
                <Image
                  key={i}
                  defaultSrc={l.image}
                  width={34}
                  height={23}
                  className="rounded"
                  alt="pay"
                />
              ))}
            </div>
            {/* <ul className="mt-4 text-[#E1E1FE] list-disc pl-5 text-sm sm:text-base">
              <li>Pay on Delivery</li>
              <li>Make a Bank Transfer</li>
              <li>We accept Cheques</li>
            </ul> */}
          </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-l to-[#FDDE5C] from-[#70DB96]" />
        <div className="flex flex-col lg:flex-row items-center justify-between pt-4 gap-y-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-2">
            <Image
              src={siteSetting?.footer_logo}
              // defaultSrc="/footer_logo.png"
              // isLocal
              width={127}
              height={32}
              alt="logo"
            />
            <p className="text-sm md:text-base text-neutral-200">
              &copy;Copyright {currentYear}. All rights reserved.
            </p>
          </div>
          <nav className="space-x-3 sm:space-x-6">
            {quickLinks.map((link, i) => (
              <Link
                key={`quickL_${i}`}
                href={link.url}
                className="text-xs sm:text-sm md:text-base sm:font-medium text-white hover:text-white/65 hover:scale-90 underline transition-all duration-300"
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
