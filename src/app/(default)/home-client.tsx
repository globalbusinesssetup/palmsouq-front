'use client';
import {
  CategoriesBar,
  Footer,
  Header,
  ProductCard,
  Image,
} from '@/components';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { features, orderSteps } from '@/constants';
import { HiArrowLeft, HiArrowRight, HiOutlineMail } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { IoCallOutline } from 'react-icons/io5';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';
import { useResponsiveSlides } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getHome } from '@/utils/api';
import { temp_banner } from '@/utils/helper';
import useAuth from '@/hooks/useAuth';
import config from '@/config';
import { set } from 'react-hook-form';

type SwiperElement = Element & {
  swiper?: {
    slideNext: () => void;
    slidePrev: () => void;
  };
};

const catBreakpoints = [
  { width: 1440, slide: 12 },
  { width: 1279, slide: 10 },
  { width: 1023, slide: 8 },
  { width: 767, slide: 6 },
  { width: 639, slide: 3 },
  { width: 0, slide: 2 },
];

const brandBreakpoints = [
  { width: 1279, slide: 10 },
  { width: 1023, slide: 7 },
  { width: 767, slide: 6 },
  { width: 639, slide: 4 },
  { width: 0, slide: 3 },
];

const testimonialBreakpoints = [
  { width: 1023, slide: 3 },
  { width: 639, slide: 2 },
  { width: 0, slide: 1 },
];

export default function HomeClient() {
  const { setting } = useAuth();
  const getCatSlide = useResponsiveSlides(catBreakpoints, 2);
  const getBrandSlide = useResponsiveSlides(brandBreakpoints, 3);
  const getTestimonialSlide = useResponsiveSlides(testimonialBreakpoints);
  const [rating, setRating] = useState<number>(3.5);
  const [swiperEl, setSwiperEl] = useState<NodeListOf<SwiperElement> | null>(
    null
  );
  const [bannerError, setBannerError] = useState(false);
  const { data, isLoading: isCatLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: home, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHome,
  });

  useEffect(() => {
    setSwiperEl(document.querySelectorAll('swiper-container'));
    register();
  }, []);

  const onNext = (id: number) => {
    swiperEl?.[id]?.swiper?.slideNext();
  };

  const onPrev = (id: number) => {
    swiperEl?.[id]?.swiper?.slidePrev();
  };

  if (isLoading || isCatLoading) {
    return (
      <main>
        <div className="w-screen h-screen bg-white space-y-2 container mx-auto">
          <div className="w-full h-9 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-24 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-16 bg-gray-300 animate-pulse rounded" />
          <div className="">
            <div className="flex gap-x-5">
              <div className="w-3/5 h-[30vh] bg-gray-300 animate-pulse rounded" />
              <div className="flex-1 h-[30vh] bg-gray-300 animate-pulse rounded" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-5 mt-5">
              {Array(getCatSlide)
                .fill(' ')
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[20vh] bg-gray-300 animate-pulse rounded"
                  />
                ))}
            </div>
            <div className="flex gap-x-5 mt-5">
              <div className="flex-1 h-[15vh] bg-gray-300 animate-pulse rounded" />
              <div className="flex-1 h-[15vh] bg-gray-300 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const companyDetails = [
    {
      title: 'E-mail us',
      value: setting?.email,
      icon: <HiOutlineMail className="text-2xl md:text-4xl" />,
    },
    {
      title: 'Call us',
      value: setting?.phone,
      icon: <IoCallOutline className="text-2xl md:text-4xl" />,
    },
    {
      title: 'Support',
      value: setting?.phone,
      icon: <IoCallOutline className="text-2xl md:text-4xl" />,
    },
    {
      title: 'Location',
      value: setting?.address_1,
      icon: <GrLocation className="text-2xl md:text-4xl" />,
    },
  ];

  return (
    <>
      <CategoriesBar />
      <div className="container mx-auto min-h-[55vh] mt-5 lg:mt-8 xl:mt-10 pb-7 px-4">
        {/* Banner  */}
        <section className="lg:flex lg:space-x-4">
          <div className="lg:w-7/12 h-[200px] sm:h-[250px] xl:h-[304px] rounded-[10px] overflow-hidden">
            <swiper-container
              className="w-full"
              pagination={{ clickable: true }}
              navigation={true}
              space-between={10}
              autoplay
            >
              {home?.slider?.main.map((s: { image: string }, i) => (
                <swiper-slide key={`banner_${i}`} style={{ width: '100%' }}>
                  <div className="w-full h-[200px] sm:h-[250px] xl:h-[304px] relative overflow-hidden rounded-[10px]">
                    <Image
                      src={s?.image}
                      fill
                      alt={'banner'}
                      className="object-cover"
                    />
                  </div>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
          <Link
            href={home?.slider?.right_top?.url ?? '#'}
            className="lg:w-5/12 h-[250px] xl:h-[304px] hidden lg:block relative overflow-hidden sm:rounded-[10px] mt-4 lg:mt-0"
          >
            <Image
              src={home?.slider?.right_top?.image}
              onError={() => setBannerError(true)}
              fill
              alt={home?.slider?.right_top?.title ?? 'Weekly offer Banner'}
              className="bg-gray-100"
            />
          </Link>
        </section>
        {/* explore by categories */}
        {home?.featured_categories?.length! > 0 && (
          <section className="mt-7 p-4 rounded-[10px] border border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl lg:text-2xl text-primary font-semibold">
                Explore by categories
              </h3>
              <div className="flex items-center gap-x-2">
                <button
                  onClick={() => onPrev(1)}
                  className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-[#F5F5F7] hover:bg-[#F5F5F7]/70 hover:scale-95 active:scale-90"
                >
                  <HiArrowLeft className="lg:text-2xl text-neutral-500" />
                </button>
                <button
                  onClick={() => onNext(1)}
                  className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-[#F5F5F7] hover:bg-[#F5F5F7]/70 hover:scale-95 active:scale-90"
                >
                  <HiArrowRight className="lg:text-2xl text-neutral-500" />
                </button>
              </div>
            </div>
            <div className="mt-5 overflow-hidden">
              <swiper-container
                slides-per-view={getCatSlide}
                space-between={16}
              >
                {home?.featured_categories?.map(
                  (cat: { slug: string; title: string; image: string }, i) => (
                    <swiper-slide key={`cat_${i}`} className="">
                      <CatCard cat={cat} />
                    </swiper-slide>
                  )
                )}
              </swiper-container>
            </div>
          </section>
        )}
        {/* explore by brand */}
        <section className="mt-7 p-4 rounded-[10px] border border-neutral-200">
          <div className="flex items-center justify-between">
            <Link href={'/brands'}>
              <h3 className="text-lg sm:text-xl text-primary font-semibold flex gap-x-2 items-center">
                Explore all brands{' '}
                <HiArrowRight className="text-neutral-600 text-base sm:text-lg" />
              </h3>
            </Link>
            {/* <div className="flex items-center gap-x-2">
              <button
                onClick={() => onPrev(2)}
                className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-[#F5F5F7] hover:bg-[#F5F5F7]/70 hover:scale-95 active:scale-90"
              >
                <HiArrowLeft className="lg:text-2xl text-neutral-500" />
              </button>
              <button
                onClick={() => onNext(2)}
                className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-[#F5F5F7] hover:bg-[#F5F5F7]/70 hover:scale-95 active:scale-90"
              >
                <HiArrowRight className="lg:text-2xl text-neutral-500" />
              </button>
            </div> */}
          </div>
          <div className="mt-1 max-h-[172px] overflow-hidden">
            <swiper-container
              slides-per-view={getBrandSlide}
              space-between={16}
              pagination={{ clickable: true }}
            >
              {home?.featured_brands?.map(
                (
                  cat: {
                    slug: string;
                    title: string;
                    image: string;
                    id: number;
                  },
                  i
                ) => (
                  <swiper-slide key={`cat_${i}`} className="">
                    <Link
                      href={`/brand?sortby=&shipping=&brand=${cat.id}&collection=&rating=0&max=0&min=0&page=`}
                      className="block rounded-lg xs:min-w-[155px] flex-1 pt-4 overflow-hidden"
                    >
                      <div className="h-[100px] relative mx-1 mb-4 overflow-hidden rounded-md">
                        <Image
                          src={cat?.image}
                          width={100}
                          height={100}
                          alt="cat image"
                          loading="lazy"
                          className="rounded-full mx-auto object-contain"
                        />
                      </div>
                      {/* <div className="px-3 xs:px-5 py-3 text-xs font-semibold text-neutral-600 transition-all duration-300 hover:text-primary/70 flex items-center justify-center gap-x-2 whitespace-nowrap">
                        <p className="flex-1 overflow-hidden text-ellipsis">
                          {cat?.title}
                        </p>
                        <FaArrowRightLong className="text-base" />
                      </div> */}
                    </Link>
                  </swiper-slide>
                )
              )}
            </swiper-container>
          </div>
        </section>
        {/* in demand products */}
        {home?.collections?.[0]?.product_collections?.length! > 0 && (
          <>
            <section className="flex items-center gap-x-4 mt-5 md:mt-8">
              <div className="flex-1 h-[108px] bg-[#F5F5F7] relative rounded overflow-hidden">
                <Image
                  src={home?.banners[0].image}
                  fill
                  alt={home?.banners[0].title}
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block flex-1 h-[108px] bg-[#F5F5F7] relative rounded overflow-hidden">
                <Image
                  src={home?.banners[1].image}
                  fill
                  alt={home?.banners[0].title}
                  className="object-cover"
                />
              </div>
            </section>

            <section className="mt-7 bg-[#F9FAFB] rounded-[10px] px-2 lg:px-5 py-4">
              <div className="pb-4">
                <h3 className="text-lg md:text-2xl text-primary font-semibold">
                  {home?.collections[0].title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1">
                  Discover the Best Selling Products on the Market Today.
                </p>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {home?.collections[0]?.product_collections?.map(
                  (product, i) => (
                    <ProductCard
                      data={product}
                      category={home?.collections[0]?.slug}
                      key={`product_${i}`}
                    />
                  )
                )}
              </div>
            </section>
          </>
        )}
        {/* popular business cards  */}
        {home?.collections?.[1]?.product_collections?.length! > 0 && (
          <>
            <div className="w-full h-[180px] lg:h-[240px] bg-secondary mt-8 lg:mt-10 rounded-md overflow-hidden relative">
              <Image
                src={home?.banners[2].image}
                fill
                alt={home?.banners[2].title}
                className="object-cover"
              />
            </div>
            <section className="mt-5 md:mt-8 lg:mt-10 bg-[#F9FAFB] rounded-[10px] px-2 lg:px-5 py-4">
              <div className="pb-4 flex lg:items-center justify-between">
                <div className="max-w-[70%] sm:max-w-none">
                  <h3 className="text-lg md:text-xl lg:text-2xl text-primary font-semibold">
                    {home?.collections[1].title}
                  </h3>
                  <p className="text-xs sm:text-base text-neutral-600 mt-1">
                    Personalized Business Cards Printing for all your networking
                    needs
                  </p>
                </div>
                <Link
                  href={`/${home?.collections[1]?.slug}`}
                  className="sm:w-[115px] px-2 h-8 sm:h-10 flex text-xs sm:text-base items-center justify-center gap-x-2 rounded-full transition-all duration-300 text-[#6835B1] border border-[#6835B1] hover:scale-95"
                >
                  View All <HiArrowRight />
                </Link>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {home?.collections[1]?.product_collections?.map(
                  (product, i) => (
                    <ProductCard
                      data={product}
                      category={home?.collections[1]?.slug}
                      key={`p_product_${i}`}
                    />
                  )
                )}
              </div>
            </section>
          </>
        )}
        {/* High demand flyers  */}
        {home?.collections?.[2]?.product_collections?.length! > 0 && (
          <>
            <section className="flex items-center gap-x-4 mt-5 md:mt-8">
              <div className="flex-1 h-[150px] sm:h-[180px] lg:h-[240px] bg-[#F5F5F7] relative rounded-md overflow-hidden">
                <Image
                  src={home?.banners[3].image}
                  fill
                  alt={home?.banners[3].title}
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block flex-1 h-[180px] lg:h-[240px] bg-[#F5F5F7] relative rounded-md overflow-hidden">
                <Image
                  src={home?.banners[4].image}
                  fill
                  alt={home?.banners[0].title}
                  className="object-cover"
                />
              </div>
            </section>
            <section className="mt-5 md:mt-8 lg:mt-10 bg-[#F9FAFB] rounded-[10px] px-2 lg:px-5 py-4">
              <div className="pb-4 flex lg:items-center justify-between">
                <div className="max-w-[70%] sm:max-w-none">
                  <h3 className="text-lg md:text-xl lg:text-2xl text-primary font-semibold">
                    {home?.collections[2].title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 mt-1">
                    Elevate Your Brand with our Quality Flyers Printing
                  </p>
                </div>
                <Link
                  href={'#'}
                  className="sm:w-[115px] px-2 h-8 sm:h-10 flex text-xs sm:text-base items-center justify-center gap-x-2 rounded-full transition-all duration-300 text-[#6835B1] border border-[#6835B1] hover:scale-95"
                >
                  View All <HiArrowRight />
                </Link>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {home?.collections[2]?.product_collections?.map(
                  (product, i) => (
                    <ProductCard
                      data={product}
                      category={home?.collections[2]?.slug}
                      key={`h_product_${i}`}
                    />
                  )
                )}
              </div>
            </section>
          </>
        )}
        {/* best selling paper bags  */}
        <>
          <section className="mt-5 md:mt-8 lg:mt-10 bg-[#F9FAFB] rounded-[10px] px-2 lg:px-5 py-4">
            <div className="pb-4 flex items-center justify-between">
              <div className="max-w-[70%] sm:max-w-none">
                <h3 className="text-lg md:text-xl lg:text-2xl text-primary font-semibold">
                  Flash sale
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mt-1">
                  {home?.flash_sales?.[0]?.title}
                </p>
              </div>
              <Link
                href={'#'}
                className="sm:w-[115px] px-2 h-8 sm:h-10 flex text-xs sm:text-base items-center justify-center gap-x-2 rounded-full transition-all duration-300 text-[#6835B1] border border-[#6835B1] hover:scale-95"
              >
                View All <HiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
              {home?.flash_sales?.[0]?.public_products?.map(
                (product: any, i) => (
                  <ProductCard
                    data={product}
                    category={'flash-sale'}
                    key={`b_product_${i}`}
                  />
                )
              )}
            </div>
          </section>
          <div className="w-full h-[180px] lg:h-[240px] bg-secondary mt-8 lg:mt-10 rounded-md overflow-hidden relative">
            <Image
              src={home?.banners[5].image}
              fill
              alt={home?.banners[5].title}
              className="object-cover"
            />
          </div>
        </>
        {/* features */}
        <section className="mt-5 md:mt-8 lg:mt-10 p-4 space-y-10 md:space-y-0 md:flex flex-wrap items-center gap-[18px]">
          {home?.site_features?.map((feature: any, i) => (
            <div
              key={`feature_${i}`}
              className="flex-1 p-3 xl:p-4 border border-[#385f48bf] rounded-lg flex items-center gap-x-3 xl:gap-x-4"
            >
              <div className="size-10 lg:size-14 xl:size-[72px] rounded-full flex items-center justify-center bg-neutral-50">
                <Image
                  src={feature?.image}
                  width={42}
                  height={42}
                  className="size-8 xl:size-[42px]"
                  alt={feature.title}
                />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: feature?.detail }}
                className="flex-1"
              >
                {/* <h6 className=" xl:text-lg font-semibold text-black whitespace-nowrap">
                  {feature.title}
                </h6>
                <p className="text-xs xl:text-sm text-neutral-600 mt-1 whitespace-nowrap">
                  {feature.desc}
                </p> */}
              </div>
            </div>
          ))}
        </section>
        {/* client testimonial  */}
        {home?.testimonials?.length! > 0 && (
          <section className="p-4 lg:p-8 bg-[#A79F881A] mt-8 lg:mt-10">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-success text-lg md:text-xl lg:text-2xl">
                  Client, Testimonial
                </p>
                <p className="mt-1 text-lg md:text-xl lg:text-2xl text-primary font-semibold">
                  The preferred printing partner for over 2000+ professionals.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-x-2">
                <button
                  onClick={() => onPrev(3)}
                  className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-white hover:bg-white/70 hover:scale-95 active:scale-90"
                >
                  <HiArrowLeft className="lg:text-2xl text-neutral-500" />
                </button>
                <button
                  onClick={() => onNext(3)}
                  className="size-8 lg:size-10 rounded-full flex items-center justify-center bg-white hover:bg-white/70 hover:scale-95 active:scale-90"
                >
                  <HiArrowRight className="lg:text-2xl text-neutral-500" />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <swiper-container
                slides-per-view={getTestimonialSlide}
                space-between={16}
                autoplay
              >
                {home?.testimonials?.map((t, i) => (
                  <swiper-slide key={`testimonial_${i}`}>
                    <div className="flex-1 bg-white border border-neutral-200 p-3 lg:p-6 space-y-3 rounded-lg">
                      <h5 className="text-neutral-700 font-medium md:text-lg lg:text-[21.31px] leading-[25.79px]">
                        {t?.client_name}
                      </h5>
                      <StarRatings
                        rating={t?.rating}
                        starRatedColor="#F8A401"
                        starHoverColor="#F8A401"
                        numberOfStars={5}
                        starDimension="19px"
                        starSpacing="5px"
                        name="rating"
                      />
                      <p className="text-[#133240] text-sm lg:text-base">
                        {t?.testimonial}
                      </p>
                    </div>
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </section>
        )}
        {/* industry banner  */}
        <section className="mt-5 md:mt-8 lg:mt-10 p-4 sm:px-6 py-5 sm:py-[33px] border border-[#10182833] rounded-[10px] md:flex items-center gap-x-10 justify-between">
          <div className="flex-1 w-full h-[250px] xs:h-[293px] relative">
            <Image
              defaultSrc={'/banners/industry-banner.png'}
              isLocal
              fill
              alt="industry banner"
            />
          </div>
          <div className="flex-1 mt-5 md:mt-0">
            <p className=" xl:text-lg font-medium text-success/80">
              Fastest and Cheapest Store in UAE{' '}
            </p>
            <h3 className="text-lg lg:text-xl xl:text-3xl font-semibold text-neutral-800 mt-2">
              Palmsouq is Revolutionizing the Online Outdoor & Adventure Store.
            </h3>
            <p className="mt-4 text-sm lg:text-base xl:text-lg text-neutral-600">
              Delivering top-quality Tools and Products in UAE with a wide range
              of high-quality Tools products at the best prices in the UAE. Our
              easy-to-use website makes it a breeze to order the printed
              materials you need simply select your desired product, choose your
              quantity, and upload your design. Our team of expert printers will
              take it from there.
            </p>
          </div>
        </section>
        {/* order steps */}
        <section className="mt-5 md:mt-8 lg:mt-10 sm:px-6 py-4 bg-neutral-50 rounded-[10px] flex flex-wrap items-center gap-6">
          {orderSteps.map((step, i) => (
            <div
              key={`step_${i}`}
              className="flex-1 flex flex-col gap-y-4 items-center"
            >
              <div className="w-[83px] h-[78px] md:w-[93px] md:h-[88px] relative">
                <Image defaultSrc={step.icon} isLocal fill alt={step.title} />
              </div>
              <div className="text-center">
                <h4 className="lg:text-lg xl:text-xl font-medium text-primary text-nowrap">
                  {step.title}
                </h4>
                <p className="text-xs lg:text-sm font-medium text-neutral-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
      {/* companyDetails */}

      <section className="bg-neutral-50 pt-10 pb-[30px] px-4 sm:px-0">
        <div className="container px-4 mx-auto flex flex-wrap gap-3 lg:gap-5 lg:justify-between">
          {companyDetails.map((detail, i) => (
            <div
              key={`detail_${i}`}
              className="flex gap-x-3.5 xs:max-w-[50%] sm:max-w-fit"
            >
              {detail.icon}
              <div className="max-w-[220px] flex-1">
                <h5 className="md:text-lg text-neutral-900 font-semibold">
                  {detail.title}
                </h5>
                <p className="mt-1 text-xs lg:text-sm text-neutral-700">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

const CatCard = ({ cat }: any) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Link
      href={`/${cat.slug}`}
      className="block rounded-lg bg-[#F5F5F7] xs:min-w-[95px] 2xl:min-w-[107px] flex-1 pt-2 overflow-hidden"
    >
      <div className="h-[100px] relative mx-1 mb-4 overflow-hidden rounded-md">
        <Image
          src={imageError ? config.defaultImage : cat.image}
          onError={() => setImageError(true)}
          fill
          alt="cat image"
          loading="lazy"
        />
      </div>
      <div className="px-3 xs:px-5 py-3 text-xs font-semibold text-neutral-600 transition-all duration-300 hover:text-primary/70 flex items-center justify-center gap-x-2 whitespace-nowrap">
        <p className="flex-1 overflow-hidden text-ellipsis">{cat?.title}</p>
        <FaArrowRightLong className="text-base" />
      </div>
    </Link>
  );
};
