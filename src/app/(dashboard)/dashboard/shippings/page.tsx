'use client';
import React, { useEffect, useState } from 'react';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Input, Button, Select } from '@/components';
import { useForm } from 'react-hook-form';
import { getAddress, getCountries, useGetUser } from '@/utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { Address as AddressType, Country, State, City } from '@/types';
import { getCountryTitle, getStateTitle } from '@/utils/helper';
import UpdateAddress from '@/app/(default)/checkout/UpdateAddress';

const Shippings = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: useGetUser,
  });
  const { data: addresses, isLoading: isAddressLoading } = useQuery({
    queryKey: ['address'],
    queryFn: () => getAddress(),
  });
  const { data: countriesWithPhones, isLoading: isCountriesLoading } = useQuery(
    {
      queryKey: ['countries'],
      queryFn: getCountries,
    }
  );
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(addresses?.data[0]?.id);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phone: '',
      address: '',
      city: '',
      zip: '',
    },
  });
  // const [countryData, setCountryData] = useState<{
  //   [key: string]: Country;
  // } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('AE');
  const [selectedStates, setStates] = useState<State>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCities, setCities] = useState<City>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedCountry && countriesWithPhones) {
      setStates(
        Object.values(
          countriesWithPhones.countries[selectedCountry]?.states || []
        )
      );
      if (selectedState) {
        setCities(
          Object.values(
            countriesWithPhones.countries[selectedCountry].states[selectedState]
              ?.cities || []
          )
        );
      }
    } else {
      setStates([]);
    }
    // eslint-disable-next-line
  }, [!countriesWithPhones]);

  useEffect(() => {
    if (!defaultAddress && addresses?.data.length) {
      setDefaultAddress(addresses?.data[0].id);
    }
  }, [defaultAddress, addresses]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    if (countriesWithPhones && countriesWithPhones.countries[countryCode]) {
      setStates(
        Object.values(countriesWithPhones.countries[countryCode].states)
      );
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
    // if (
    //   countryData &&
    //   countryData[selectedCountry] &&
    //   countryData[selectedCountry].states[stateCode]
    // ) {
    //   setCities(
    //     Object.values(
    //       countryData[selectedCountry].states[stateCode]?.cities || []
    //     )
    //   );
    // } else {
    //   setCities([]);
    // }
    // setSelectedCity('');
  };
  // const handleCityChange = (event: any) => {
  //   setSelectedCity(event.target.value);
  // };

  const addNewAddress = async (data: any) => {
    setSubmitLoading(true);
    const token = Cookies.get('token');
    try {
      const res = await api.post('/user/address/action', {
        city: data.city,
        state: selectedState,
        country: selectedCountry,
        phone: data.phone,
        address_1: data.address,
        user_token: token,
        email: user?.data?.email,
        name: `${user?.data.first_name} ${user?.data.last_name}`,
        zip: data.zip,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
        return;
      } else {
        toast.success('Address added Successfully');
        queryClient.invalidateQueries({ queryKey: ['address'] });
        reset();
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitLoading(false);
  };

  const deleteAddress = async (id: number) => {
    const token = Cookies.get('token');
    try {
      const { data } = await api.delete(
        `/user/address/delete/${id}?user_token=${token}`
      );
      queryClient.invalidateQueries({ queryKey: ['address'] });
      toast.success(data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl py-[18px] px-4 xs:px-5 lg:px-8 max-w-7xl">
      <Head>
        <title>Dasboard | Shipping Address</title>
      </Head>
      <h4 className="text-lg text-neutral-900 font-semibold">
        Shipping Address
      </h4>
      {isAddressLoading ? (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 bg-gray-300 animate-pulse h-32 rounded-lg" />
          <div className="flex-1 bg-gray-300 animate-pulse h-32 rounded-lg" />
        </div>
      ) : addresses?.data?.length ? (
        <div className="mt-6">
          <RadioGroup
            value={defaultAddress}
            onChange={setDefaultAddress}
            aria-label="Server size"
            className={
              'flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4'
            }
          >
            {addresses?.data.map((address) => (
              <Address
                key={address.id}
                countries={countriesWithPhones?.countries!}
                address={address}
                defaultAddress={defaultAddress}
                onDelete={() => deleteAddress(address.id)}
              />
            ))}
          </RadioGroup>
        </div>
      ) : (
        <div className=""></div>
      )}

      <form onSubmit={handleSubmit(addNewAddress)} className="mt-8">
        <h4 className="md:text-lg text-neutral-900 font-semibold">
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
              {!isCountriesLoading ? (
                <>
                  {Object.values(countriesWithPhones?.countries!).map(
                    (country: any) => (
                      <option key={country?.code2} value={country?.code2}>
                        {country?.name}
                      </option>
                    )
                  )}
                </>
              ) : (
                <option>loading ...</option>
              )}
            </Select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="state"
              className="text-sm font-medium text-[#344054] block"
            >
              State
            </label>
            <Select
              disabled={!selectedCountry || isCountriesLoading}
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
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
          <div className="flex-1">
            <Input
              prefix="+971"
              name="phone"
              control={control}
              rules={{
                required: 'phone number required',
                min: 10,
              }}
              label="Phone"
              placeholder="000-000-000"
              type="number"
              error={errors?.phone}
            />
          </div>
          <Input
            control={control}
            rules={{ required: 'city is required' }}
            name="city"
            label="City"
            placeholder="City"
            wrapClassName="flex-1"
            error={errors?.city}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
          <Input
            control={control}
            rules={{ required: 'address is required' }}
            name="address"
            label="Address"
            placeholder="Street, Building, Apt. etc"
            wrapClassName="flex-1"
            error={errors?.address}
          />
          <Input
            control={control}
            rules={{ required: 'zip is required' }}
            name="zip"
            label="Zip code"
            placeholder="zip code"
            type="number"
            wrapClassName="flex-1"
            error={errors?.zip}
          />
        </div>
        <div className="md:flex items-center justify-end">
          <Button
            loading={isSubmitLoading}
            disabled={!selectedCity || !selectedCountry || !selectedState}
            type="submit"
            className="md:w-[160px] text-sm font-semibold"
          >
            Add new address
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Shippings;

const Address = ({
  countries,
  address,
  defaultAddress,
  onDelete,
}: {
  countries: { [key: string]: Country };
  address: AddressType;
  defaultAddress: any;
  onDelete: () => void;
}) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const onEditOpen = (e: any) => {
    e.preventDefault();
    setEditOpen(true);
  };

  return (
    <Field
      key={address.id}
      className={`flex-1 sm:max-w-[calc(50%-16px)] sm:min-w-[calc(50%-16px)]  flex items-start gap-2 p-3 lg:p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
        defaultAddress === address.id ? 'bg-neutral-50 border-[#9B9DFD]' : ''
      }`}
    >
      <Radio
        value={address.id}
        className="group flex size-4 lg:size-5 items-center justify-center rounded-full border bg-white data-[checked]:border-primary duration-300 transition-all"
      >
        <span className="invisible size-1.5 lg:size-2 rounded-full bg-primary group-data-[checked]:visible" />
      </Radio>
      <Label className={'flex-1 flex gap-x-2 md:gap-x-2.5 cursor-pointer'}>
        <div className="flex-1">
          <p className="text-sm lg:text-base text-[#344054] font-semibold">
            {getStateTitle(countries, address.country, address.state)}
          </p>
          <p className="text-xs lg:text-sm text-neutral-400 mt-0.5">
            {getStateTitle(countries, address.country, address.state)},{' '}
            {getCountryTitle(countries, address.country)}
          </p>
          <p className="text-xs lg:text-sm text-neutral-400 mt-0.5">
            {address.address_1}
          </p>
          <p className="text-xs lg:text-sm text-neutral-600 mt-0.5">
            +{address.phone}
          </p>
        </div>
        <div className="min-h-full flex flex-col justify-between items-end">
          <div className="flex items-center gap-2">
            <button onClick={onEditOpen} className="text-neutral-500 text-base">
              <FiEdit />
            </button>
            {defaultAddress !== address.id && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="text-neutral-500 text-base"
              >
                <FiTrash2 />
              </button>
            )}
          </div>
          {defaultAddress === address.id && (
            <p className="h-[18px] w-10 md:w-12 rounded-full text-neutral-200 md:font-medium bg-primary text-[8px]/[14px] flex items-center justify-center">
              Default
            </p>
          )}
        </div>
      </Label>
      <UpdateAddress
        data={address}
        show={isEditOpen}
        onClose={() => setEditOpen(false)}
      />
    </Field>
  );
};
