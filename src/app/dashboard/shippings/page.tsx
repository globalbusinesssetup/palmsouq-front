'use client';
import React, { useEffect, useState } from 'react';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Input, Button, Select } from '@/components';
import { useForm } from 'react-hook-form';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { getCountryData } from '@/utils/helper';
import { FaAngleDown } from 'react-icons/fa6';

type Country = {
  code2: string;
  name: string;
  states: { [key: string]: { code: string; name: string; cities: any } };
};

type State = {
  code: string;
  name: string;
  cities: any;
}[];
type City = {
  code: string;
  name: string;
}[];

const addresses = [
  { title: 'Sharjah', value: 'sharjah', isDefault: true },
  { title: 'Dubai', value: 'dubai', isDefault: false },
];

const Shippings = () => {
  const [defaultAddress, setDefaultAddress] = useState(addresses[0].value);
  const { control } = useForm();
  const [countryData, setCountryData] = useState<{
    [key: string]: Country;
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('AE');
  const [selectedStates, setStates] = useState<State>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCities, setCities] = useState<City>([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCountryData();
        setCountryData(data);
      } catch (error) {
        setCountryData({});
        console.error('Error fetching country data:', error);
      }
    }
    loadData();
    if (selectedCountry && countryData) {
      setStates(Object.values(countryData[selectedCountry]?.states || []));
      if (selectedState) {
        setCities(
          Object.values(
            countryData[selectedCountry].states[selectedState]?.cities || []
          )
        );
      }
    } else {
      setStates([]);
    }
    // eslint-disable-next-line
  }, [countryData]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    if (countryData && countryData[countryCode]) {
      setStates(Object.values(countryData[countryCode].states));
    } else {
      setStates([]);
    }
    setSelectedState('');
    setSelectedCity('');
    setCities([]);
  };

  const handleStateChange = (event: any) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    if (
      countryData &&
      countryData[selectedCountry] &&
      countryData[selectedCountry].states[stateCode]
    ) {
      setCities(
        Object.values(
          countryData[selectedCountry].states[stateCode]?.cities || []
        )
      );
    } else {
      setCities([]);
    }
    setSelectedCity('');
  };
  const handleCityChange = (event: any) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl py-[18px] px-8">
      <h4 className="text-lg text-neutral-900 font-semibold">
        Shipping Address
      </h4>
      <div className="mt-6">
        <RadioGroup
          value={defaultAddress}
          onChange={setDefaultAddress}
          aria-label="Server size"
          className={'flex items-center gap-4'}
        >
          {addresses.map((address) => (
            <Field
              key={address.value}
              className={`flex-1 flex items-start gap-2 p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
                defaultAddress === address.value
                  ? 'bg-neutral-50 border-[#9B9DFD]'
                  : ''
              }`}
            >
              <Radio
                value={address.value}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:border-primary duration-300 transition-all"
              >
                <span className="invisible size-2 rounded-full bg-primary group-data-[checked]:visible" />
              </Radio>
              <Label className={'flex-1 flex gap-x-2.5 cursor-pointer'}>
                <div className="flex-1">
                  <p className="text-base text-[#344054] font-semibold">
                    {address.title}
                  </p>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    Dubai, United Arab Emirates
                  </p>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    Al Wahda Road, Industrial Area # 4
                  </p>
                  <p className="text-sm text-neutral-600 mt-0.5">
                    +971 55 6265479
                  </p>
                </div>
                <div className="min-h-full flex flex-col justify-between items-end">
                  <div className="flex items-center gap-2">
                    <button className="text-neutral-500 text-base">
                      <FiEdit />
                    </button>
                    {defaultAddress !== address.value && (
                      <button className="text-neutral-500 text-base">
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                  {defaultAddress === address.value && (
                    <p className="h-[18px] w-12 rounded-full text-neutral-200 font-medium bg-primary text-[8px]/[14px] flex items-center justify-center">
                      Default
                    </p>
                  )}
                </div>
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-8">
        <h4 className="text-lg text-neutral-900 font-semibold">
          New Shipping Address
        </h4>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-4 sm:mt-6 lg:mt-8">
          <div className="flex-1">
            <label
              htmlFor="countries"
              className="text-sm font-medium text-[#344054] block"
            >
              Country
            </label>
            <Select
              id="countries"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent w-full appearance-none focus-visible:outline-none mt-1.5 text-[#667085] border px-3.5 pr-5 py-2.5 rounded-lg"
            >
              <option value="">Select your Country</option>
              {countryData ? (
                <>
                  {Object.values(countryData).map((country: any) => (
                    <option key={country?.code2} value={country?.code2}>
                      {country?.name}
                    </option>
                  ))}
                </>
              ) : (
                <option>loading ...</option>
              )}
            </Select>
          </div>
          <div className="flex-1">
            <Input name="phone" control={control} label="Phone" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
          <div className="flex-1">
            <label
              htmlFor="state"
              className="text-sm font-medium text-[#344054] block"
            >
              State
            </label>
            <Select
              disabled={!selectedCountry || !countryData}
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              className="bg-transparent w-full appearance-none focus-visible:outline-none mt-1.5 text-[#667085] border px-3.5 pr-5 py-2.5 rounded-lg"
            >
              <option value="">Select your State</option>
              {selectedStates ? (
                <>
                  {selectedStates.map((state: any) => (
                    <option key={state.code} value={state.code}>
                      {state?.name}
                    </option>
                  ))}
                </>
              ) : (
                <option>loading ...</option>
              )}
            </Select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="city"
              className="text-sm font-medium text-[#344054] block"
            >
              City
            </label>
            <Select
              id="city"
              disabled={!selectedState || selectedCities.length === 0}
              value={selectedCity}
              onChange={handleCityChange}
              className="bg-transparent w-full appearance-none focus-visible:outline-none mt-1.5 text-[#667085] border px-3.5 pr-5 py-2.5 rounded-lg"
            >
              <option value="">Select your City</option>
              {selectedCities ? (
                <>
                  {selectedCities.map((city: any) => (
                    <option key={city.code} value={city.code}>
                      {city?.name}
                    </option>
                  ))}
                </>
              ) : (
                <option>loading ...</option>
              )}
            </Select>
          </div>
        </div>
        <Input
          control={control}
          name="address"
          label="Address"
          placeholder="Street, Building, Apt. etc"
          wrapClassName="mt-6"
        />
        <div className="md:flex items-center justify-end">
          <Button type="submit" className="md:w-[150px] text-sm font-semibold">
            Add new address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shippings;
