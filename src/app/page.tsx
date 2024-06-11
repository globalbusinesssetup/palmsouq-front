'use client';
import {
  Button,
  CategoriesBar,
  Footer,
  Header,
  ProductCard,
} from '@/components';
import { TopBar } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { categories, features, orderSteps } from '../../constants';
import { HiArrowLeft, HiArrowRight, HiOutlineMail } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { IoCallOutline } from 'react-icons/io5';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';

const companyDetails = [
  {
    title: 'E-mail us',
    data: ['email@yallaprints.com', 'email@yallaprints.com'],
    icon: <HiOutlineMail className="text-4xl" />,
  },
  {
    title: 'Call us',
    data: ['+971 50 1234567 (Contact)', '+971 50 1234567 (Contact)'],
    icon: <IoCallOutline className="text-4xl" />,
  },
  {
    title: 'Support',
    data: ['+971 50 1234567 (Contact)', '+971 50 1234567 (Contact)'],
    icon: <IoCallOutline className="text-4xl" />,
  },
  {
    title: 'Location',
    data: ['Industrial Area #4, Behind LuLu Al Wahda Road, Sharjah - U.A.E.'],
    icon: <GrLocation className="text-4xl" />,
  },
];

export default function Home() {
  const [rating, setRating] = useState<number>(3.5);
  useEffect(() => {
    register();
  }, []);

  return (
    <main>
      <TopBar />
      <Header />
      <CategoriesBar />
      <div className="container mx-auto min-h-[55vh] mt-10 pb-7">
        <section className="flex space-x-4">
          <div className="w-7/12 h-[304px] overflow-hidden">
            <swiper-container
              className="w-full"
              pagination="true"
              navigation="true"
              autoplay
            >
              {Array(3)
                .fill('')
                .map((_, i) => (
                  <swiper-slide key={`banner_${i}`} style={{ width: '100%' }}>
                    <div className="w-full h-[304px] relative overflow-hidden rounded-[10px]">
                      <Image src={'/banners/banner.jpeg'} fill alt={'banner'} />
                    </div>
                  </swiper-slide>
                ))}
            </swiper-container>
          </div>
          <div className="w-5/12 h-[304px] relative overflow-hidden rounded-[10px]">
            <Image src={'/banners/weekly-offer.jpeg'} fill alt={'banner'} />
          </div>
        </section>
        {/* explore by categories */}
        <section className="mt-7 p-4 rounded-[10px] border border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-primary font-semibold">
              Explore by categories
            </h3>
            <div className="flex items-center gap-x-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5F5F7] hover:bg-[#F5F5F7]/70 hover:scale-95 active:scale-90">
                <HiArrowLeft className="text-2xl text-neutral-500" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5F5F7] hover:bg-[#F5F5F7]/70 hover:scale-95 active:scale-90">
                <HiArrowRight className="text-2xl text-neutral-500" />
              </button>
            </div>
          </div>
          <div className="mt-5">
            <swiper-container slides-per-view="7" space-between={16}>
              {categories.map((cat, i) => (
                <swiper-slide key={`cat_${i}`} className="">
                  <div className="rounded-lg bg-[#F5F5F7] min-w-[155px] flex-1 pt-4">
                    <div className="w-full h-[100px] relative mx-1 mb-4">
                      <Image src={cat.img} fill alt="cat image" />
                    </div>
                    <Link
                      href={cat.link}
                      className="px-5 py-3 text-xs font-semibold text-neutral-600 flex items-center justify-center gap-x-2"
                    >
                      {cat.title} <FaArrowRightLong className="text-base" />
                    </Link>
                  </div>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </section>
        <section className="flex items-center gap-x-4 mt-8">
          <div className="flex-1 h-[108px] bg-[#F5F5F7] relative rounded overflow-hidden">
            <Image
              src={'/temp-banner.png'}
              fill
              alt="banner"
              className=" object-cover"
            />
          </div>
          <div className="flex-1 h-[108px] bg-[#F5F5F7] relative rounded overflow-hidden">
            <Image
              src={'/temp-banner.png'}
              fill
              alt="banner"
              className=" object-cover"
            />
          </div>
        </section>
        {/* in demand products */}
        <section className="mt-7 bg-[#F9FAFB] rounded-[10px] px-5 py-4">
          <div className="pb-4">
            <h3 className="text-2xl text-primary font-semibold">
              In-demand Products
            </h3>
            <p className="text-base text-neutral-600 mt-1">
              Discover the Best Selling Products on the Market Today.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {Array(8)
              .fill(' ')
              .map((product, i) => (
                <ProductCard key={`product_${i}`} />
              ))}
          </div>
        </section>
        <div className="w-full h-[240px] bg-secondary mt-10 rounded-md overflow-hidden relative">
          <Image
            src={'/temp-banner.png'}
            fill
            alt="banner"
            className="object-cover"
          />
        </div>
        {/* popular business cards  */}
        <section className="mt-10 bg-[#F9FAFB] rounded-[10px] px-5 py-4">
          <div className="pb-4 flex items-center justify-between">
            <div className="">
              <h3 className="text-2xl text-primary font-semibold">
                Popular Business Cards
              </h3>
              <p className="text-base text-neutral-600 mt-1">
                Personalized Business Cards Printing for all your networking
                needs
              </p>
            </div>
            <Link
              href={'#'}
              className="w-[115px] h-10 flex items-center justify-center gap-x-2 rounded-full transition-all duration-300 text-[#6835B1] border border-[#6835B1] hover:scale-95"
            >
              View All <HiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {Array(8)
              .fill(' ')
              .map((product, i) => (
                <ProductCard key={`product_${i}`} />
              ))}
          </div>
        </section>
        <section className="flex items-center gap-x-4 mt-8">
          <div className="flex-1 h-[240px] bg-[#F5F5F7] relative rounded-md overflow-hidden">
            <Image
              src={'/temp-banner.png'}
              fill
              alt="banner"
              className="object-cover"
            />
          </div>
          <div className="flex-1 h-[240px] bg-[#F5F5F7] relative rounded-md overflow-hidden">
            <Image
              src={'/temp-banner.png'}
              fill
              alt="banner"
              className="object-cover"
            />
          </div>
        </section>
        {/* High demand flyers  */}
        <section className="mt-10 bg-[#F9FAFB] rounded-[10px] px-5 py-4">
          <div className="pb-4 flex items-center justify-between">
            <div className="">
              <h3 className="text-2xl text-primary font-semibold">
                High Demand Flyers
              </h3>
              <p className="text-base text-neutral-600 mt-1">
                Elevate Your Brand with our Quality Flyers Printing
              </p>
            </div>
            <Link
              href={'#'}
              className="w-[115px] h-10 flex items-center justify-center gap-x-2 rounded-full transition-all duration-300 text-[#6835B1] border border-[#6835B1] hover:scale-95"
            >
              View All <HiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {Array(8)
              .fill(' ')
              .map((product, i) => (
                <ProductCard key={`product_${i}`} />
              ))}
          </div>
        </section>
        <div className="w-full h-[240px] bg-secondary mt-10 rounded-md overflow-hidden relative">
          <Image
            src={'/temp-banner.png'}
            fill
            alt="banner"
            className="object-cover"
          />
        </div>
        {/* best selling paper bags  */}
        <section className="mt-10 bg-[#F9FAFB] rounded-[10px] px-5 py-4">
          <div className="pb-4 flex items-center justify-between">
            <div className="">
              <h3 className="text-2xl text-primary font-semibold">
                Best Selling Paper Bags
              </h3>
              <p className="text-base text-neutral-600 mt-1">
                Maximize Reach with Custom Paper Bags Printing
              </p>
            </div>
            <Link
              href={'#'}
              className="w-[115px] h-10 flex items-center justify-center gap-x-2 rounded-full transition-all duration-300 text-[#6835B1] border border-[#6835B1] hover:scale-95"
            >
              View All <HiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {Array(8)
              .fill(' ')
              .map((product, i) => (
                <ProductCard key={`product_${i}`} />
              ))}
          </div>
        </section>
        {/* features */}
        <section className="mt-10 p-4 flex items-center gap-x-[18px]">
          {features.map((feature, i) => (
            <div
              key={`feature_${i}`}
              className="flex-1 p-4 border border-[#385f48bf] rounded-lg flex items-center gap-x-4"
            >
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-neutral-50">
                <Image src={feature.icon} width={42} height={42} alt="icon" />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold text-black">
                  {feature.title}
                </h6>
                <p className="text-sm text-neutral-600 mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </section>
        {/* client testimonial  */}
        <section className="p-8 bg-[#A79F881A] mt-10">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-success text-2xl">Client, Testimonial</p>
              <p className="mt-1 text-2xl text-primary font-semibold">
                The preferred printing partner for over 2000+ professionals.
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-white/70 hover:scale-95 active:scale-90">
                <HiArrowLeft className="text-2xl text-neutral-500" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-white/70 hover:scale-95 active:scale-90">
                <HiArrowRight className="text-2xl text-neutral-500" />
              </button>
            </div>
          </div>
          <div className="mt-6">
            <swiper-container slides-per-view={3} space-between={16} autoplay>
              {Array(5)
                .fill(' ')
                .map((_, i) => (
                  <swiper-slide key={`testimonial_${i}`}>
                    <div className="flex-1 bg-white border border-neutral-200 p-6 space-y-3 rounded-lg">
                      <h5 className="text-neutral-700 font-medium text-[21.31px] leading-[25.79px]">
                        Floyd Miles
                      </h5>
                      <StarRatings
                        rating={rating}
                        starRatedColor="#F8A401"
                        starHoverColor="#F8A401"
                        numberOfStars={5}
                        starDimension="19px"
                        starSpacing="5px"
                        name="rating"
                      />
                      <p className="text-[#133240]">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit mollit. Exercitation veniam consequat sunt nostrud
                        amet.{' '}
                      </p>
                    </div>
                  </swiper-slide>
                ))}
            </swiper-container>
          </div>
        </section>
        {/* industry banner  */}
        <section className="mt-10 px-6 py-[33px] border border-[#10182833] rounded-[10px] flex items-center gap-x-10 justify-between">
          <div className="flex-1 w-full h-[293px] relative">
            <Image
              src={'/banners/industry-banner.png'}
              fill
              alt="industry banner"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-success/80">
              Fastest and Cheapest Printing in UAE{' '}
            </p>
            <h3 className="text-3xl font-semibold text-neutral-800 mt-2">
              Printcraft is Revolutionizing the Online Printing Industry.
            </h3>
            <p className="mt-4 text-lg text-neutral-600">
              Delivering top-quality Design and Printing in UAE with a wide
              range of high-quality printing products at the best prices in the
              UAE. Our easy-to-use website makes it a breeze to order the
              printed materials you need simply select your desired product,
              choose your quantity, and upload your design. Our team of expert
              printers will take it from there.
            </p>
          </div>
        </section>
        {/* order steps */}
        <section className="mt-10 px-6 py-4 bg-neutral-50 rounded-[10px] flex items-center gap-6">
          {orderSteps.map((step, i) => (
            <div
              key={`step_${i}`}
              className="flex-1 flex flex-col gap-y-4 items-center"
            >
              <div className="w-[93px] h-[88px] relative">
                <Image src={step.icon} fill alt="icon" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-medium text-primary">
                  {step.title}
                </h4>
                <p className="text-sm font-medium text-neutral-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
      {/* companyDetails */}
      <section className="bg-neutral-50 pt-10 pb-[30px]">
        <div className="container mx-auto flex items-center justify-between">
          {companyDetails.map((detail, i) => (
            <div key={`detail_${i}`} className="flex gap-x-3.5">
              {detail.icon}
              <div className="max-w-[220px]">
                <h5 className="text-lg text-neutral-900 font-semibold">
                  {detail.title}
                </h5>
                {detail.data.map((d, i) => (
                  <p key={`k_${i}`} className="mt-1 text-sm text-neutral-700">
                    {d}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
