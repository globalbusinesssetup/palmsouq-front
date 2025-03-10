import { Button, CheckBox } from '@/components';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

const Filter = ({
  data,
  handleFilters,
  setPrice,
  setRating,
  selectedPrice,
  Qrating,
  selectedBrands,
  handleOnChange,
  selectedCollections,
  selectedShipping,
}) => {
  const [isShowAll, setShowAll] = useState(false);
  return (
    <div className="lg:w-[200px] pb-5">
      <div className="space-y-2">
        {data?.pages?.[0].category &&
          data?.pages?.[0].category?.child?.map((cat, i) => (
            <Link
              href={`/${cat.slug}`}
              key={i}
              className="uppercase text-sm hover:underline text-gray-700 block"
            >
              {`${cat?.title}`}
            </Link>
          ))}
      </div>
      <div className="">
        <h3 className="text-gray-700 text-lg lg:text-xl font-bold mt-3">
          Price
        </h3>
        <button
          onClick={() => {
            setPrice({ min: '', max: '' });
            handleFilters({ minPrice: '', maxPrice: '' });
          }}
          className="pr-2 py-2 mt-4 text-xs"
        >
          Any price
        </button>
        <div className="flex gap-x-2 mt-2">
          <div className="flex gap-x-3">
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 divide-x">
              <p className="text-xs text-gray-600 pr-1 font-bold">AED</p>
              <input
                type="number"
                placeholder="Min"
                value={selectedPrice.min}
                onChange={(e) =>
                  setPrice((prev) => ({ ...prev, min: e.target.value }))
                }
                className="px-2 py-1 w-full text-xs focus-visible:outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 divide-x">
              <p className="text-xs text-gray-600 pr-1 font-bold">AED</p>
              <input
                type="number"
                placeholder="Max"
                value={selectedPrice.max}
                onChange={(e) =>
                  setPrice((prev) => ({ ...prev, max: e.target.value }))
                }
                className="px-2 py-1 w-full text-xs focus-visible:outline-none"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={() =>
            handleFilters({
              minPrice: selectedPrice.min,
              maxPrice: selectedPrice.max,
            })
          }
          className="mt-4 h-8 py-0 !text-xs"
        >
          Go
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-700 text-lg lg:text-xl font-bold mt-3">
          Customer reviews
        </h3>
        <button
          onClick={() => {
            setRating(0);
            handleFilters({ rating: 0 });
          }}
          className="px-2 py-2 mt-4 text-xs"
        >
          Clear{' '}
        </button>
        <div className="mt-2 space-y-2">
          <button
            onClick={() => {
              setRating(1);
              handleFilters({ rating: 1 });
            }}
            disabled={Number(Qrating) === 1}
            className="flex items-center gap-x-1"
          >
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />{' '}
            <span className="text-sm">&up</span>
          </button>
          <button
            onClick={() => {
              setRating(2);
              handleFilters({ rating: 2 });
            }}
            disabled={Number(Qrating) === 2}
            className="flex items-center gap-x-1"
          >
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />{' '}
            <span className="text-sm">&up</span>
          </button>
          <button
            onClick={() => {
              setRating(3);
              handleFilters({ rating: 3 });
            }}
            disabled={Number(Qrating) === 3}
            className="flex items-center gap-x-1"
          >
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />{' '}
            <span className="text-sm">&up</span>
          </button>
          <button
            onClick={() => {
              setRating(4);
              handleFilters({ rating: 4 });
            }}
            disabled={Number(Qrating) === 4}
            className="flex items-center gap-x-1"
          >
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStar size={20} className="text-orange-400" />
            <IoMdStarOutline size={20} className="text-orange-400" />{' '}
            <span className="text-sm">&up</span>
          </button>
        </div>
      </div>
      {data?.pages?.[0].brands?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 text-xl font-bold mt-3">Brands</h3>
          <div
            className={`mt-3 space-y-1 ${
              isShowAll ? '' : 'h-[150px] overflow-hidden'
            }`}
          >
            {data?.pages?.[0].brands.map((b, i) => (
              <div key={`brand_${i}`} className="flex items-center gap-x-2">
                <CheckBox
                  checked={selectedBrands.includes(b.id)}
                  onChange={(e) => handleOnChange({ brand: b.id })}
                  id={`b_${b.id}`}
                />
                <label
                  onClick={() => handleOnChange({ brand: b.id })}
                  htmlFor={`b_${b.id}`}
                  className=" cursor-pointer"
                >
                  {b.title}
                </label>
              </div>
            ))}
          </div>
          {data?.pages?.[0].brands?.length > 5 && (
            <button
              onClick={() => setShowAll(!isShowAll)}
              className="mt-3 text-sm"
            >
              {isShowAll ? 'Hide all' : 'Show all'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
