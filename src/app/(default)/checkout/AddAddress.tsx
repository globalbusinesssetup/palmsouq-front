import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Modal, InputPhoneNumber } from '@/components';
import { useForm } from 'react-hook-form';
import { getCountries, useGetUser } from '@/utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Country, State, City } from '@/types';

const AddAddress = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: useGetUser });
  const { data: countriesPhones, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['countries-phones'],
    queryFn: getCountries,
  });
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      phone: '',
      address: '',
      city: '',
      email: '',
      name: '',
      zip: '',
      label: '',
    },
  });
  const [countryData, setCountryData] = useState<{
    [key: string]: Country;
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('AE');
  const [selectedStates, setStates] = useState<State>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCities, setCities] = useState<City>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isCountriesLoading) {
      setCountryData(countriesPhones?.countries!);
    }
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
  }, [isCountriesLoading, countryData, selectedCountry, selectedState]);

  useEffect(() => {
    reset({
      email: user?.data?.email,
      name: `${user?.data.first_name ?? ''} ${user?.data.last_name ?? ''}`,
    });
  }, [user, reset]);

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

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    if (countryData && countryData[selectedCountry]?.states[stateCode]) {
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

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const addNewAddress = async (data: any) => {
    setSubmitLoading(true);
    const token = Cookies.get('user_token');
    try {
      const res = await api.post('/user/address/action', {
        ...data,
        state: selectedState,
        country: selectedCountry,
        address_1: data.address,
        user_token: token,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
      } else {
        toast.success('Address added Successfully');
        await queryClient.invalidateQueries({ queryKey: ['address'] });
        await queryClient.refetchQueries({ queryKey: ['address'] });
        onClose();
        reset();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitLoading(false);
  };

  const handleClose = () => {
    onClose();
    clearErrors();
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <form onSubmit={handleSubmit(addNewAddress)} className="">
        <h4 className="md:text-lg text-neutral-900 font-semibold">
          New Shipping Address
        </h4>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4">
          <Input
            control={control}
            rules={{ required: 'label is required' }}
            name="label"
            label="Label"
            placeholder="Exmp: Home, Office, etc."
            wrapClassName="flex-1"
            error={errors?.label}
          />
          <Input
            control={control}
            rules={{ required: 'email is required' }}
            name="email"
            label="Email"
            placeholder="example@mail.com"
            wrapClassName="flex-1"
            error={errors?.email}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4">
          <Input
            control={control}
            rules={{ required: 'name is required' }}
            name="name"
            label="Name"
            placeholder="Jon Doe"
            wrapClassName="flex-1"
            error={errors?.name}
          />
          <InputPhoneNumber
            name="phone"
            control={control}
            defaultValue={user?.data.phone ?? ''}
            label="Phone"
            clearErrors={clearErrors}
            wrapClassName="flex-1"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6">
          <Input
            control={control}
            rules={{ required: 'city is required' }}
            name="city"
            label="City"
            placeholder="City"
            wrapClassName="flex-1"
            error={errors?.city}
          />
          <Input
            control={control}
            rules={{ required: 'address is required' }}
            name="address"
            label="Address"
            placeholder="Street, Building, Apt. etc"
            wrapClassName="flex-1"
            error={errors?.address}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-4">
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
              disabled
              onChange={handleCountryChange}
              className="bg-transparent w-full appearance-none focus-visible:outline-none mt-1.5 text-[#667085] border px-3.5 pr-5 py-2.5 rounded-lg"
            >
              <option value="">Select your Country</option>
              {countryData ? (
                Object.values(countryData).map((country: any) => (
                  <option key={country?.code2} value={country?.code2}>
                    {country?.name}
                  </option>
                ))
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
              id="state"
              value={selectedState}
              disabled={!selectedCountry || !countryData}
              onChange={handleStateChange}
              className="bg-transparent w-full appearance-none focus-visible:outline-none mt-1.5 text-[#667085] border px-3.5 pr-5 py-2.5 rounded-lg"
            >
              <option value="">Select your State</option>
              {selectedStates ? (
                selectedStates.map((state: any) => (
                  <option key={state.code} value={state.code}>
                    {state?.name}
                  </option>
                ))
              ) : (
                <option>loading ...</option>
              )}
            </Select>
          </div>
        </div>
        <div className="md:flex items-center justify-end mt-5">
          <Button
            loading={isSubmitLoading}
            disabled={!selectedCountry || !selectedState}
            type="submit"
            className="md:w-[160px] text-sm font-semibold"
          >
            Add new address
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAddress;
