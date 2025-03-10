import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Modal, InputPhoneNumber } from '@/components';
import { useForm } from 'react-hook-form';
import { getCountries } from '@/utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import { toast } from 'react-toastify';
import { Country, State, City, Address } from '@/types';

const UpdateAddress = ({
  show,
  onClose,
  data,
}: {
  show: boolean;
  onClose: () => void;
  data: Address;
}) => {
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
      phone: data.phone ?? '',
      email: data.email ?? '',
      name: data.name ?? '',
      address_1: data.address_1 ?? '',
      city: data.city ?? '',
      label: data.label ?? '',
    },
  });
  const [countryData, setCountryData] = useState<{
    [key: string]: Country;
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(data.country);
  const [selectedStates, setStates] = useState<State>([]);
  const [selectedState, setSelectedState] = useState(data.state);
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
    // eslint-disable-next-line
  }, [!countryData, isCountriesLoading]);

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
  const updateAddress = async (formData: any) => {
    setSubmitLoading(true);
    try {
      const res = await api.post('/user/address/action', {
        ...data,
        ...formData,
        country: selectedCountry,
        state: selectedState,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
        setSubmitLoading(false);
        return;
      } else {
        toast.success('Address updated Successfully');
        onClose();
        await queryClient.invalidateQueries({ queryKey: ['address'] });
        await queryClient.refetchQueries({ queryKey: ['address'] });
        onClose();
        reset();
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitLoading(false);
  };

  const handleClose = () => {
    onClose(), reset(), clearErrors();
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <form onSubmit={handleSubmit(updateAddress)} className="">
        <h4 className="md:text-lg text-neutral-900 font-semibold">
          Update Shipping Address
        </h4>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
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
            placeholder="exampl@mail.com"
            wrapClassName="flex-1"
            error={errors?.email}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
          <Input
            control={control}
            rules={{ required: 'name is required' }}
            name="name"
            label="Name"
            placeholder="Name"
            wrapClassName="flex-1"
            error={errors?.name}
          />
          <div className="flex-1">
            <InputPhoneNumber
              name="phone"
              control={control}
              label="Phone"
              placeholder="000-000-000"
              error={errors?.phone}
            />
          </div>
          {/* <div className="flex-1">
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
          </div> */}
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
          <Input
            control={control}
            rules={{ required: 'address is required' }}
            name="address_1"
            label="Address"
            placeholder="Street, Building, Apt. etc"
            wrapClassName="flex-1"
            error={errors?.address_1}
          />
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
              disabled
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
        </div>
        <div className="md:flex items-center justify-end mt-5">
          <Button
            loading={isSubmitLoading}
            disabled={!selectedCountry || !selectedState}
            type="submit"
            className="md:w-[160px] text-sm font-semibold"
          >
            Update address
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateAddress;
