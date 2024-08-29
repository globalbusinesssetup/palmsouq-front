import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Modal } from '@/components';
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
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: useGetUser,
  });
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
      zip: '',
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
  const addNewAddress = async (data: any) => {
    setSubmitLoading(true);
    const token = Cookies.get('token');
    try {
      const res = await api.post('/user/address/action', {
        state: selectedState,
        country: selectedCountry,
        phone: data.phone,
        address_1: data.address,
        user_token: token,
        email: user?.data?.email,
        name: `${user?.data.first_name} ${user?.data.last_name}`,
        city: data.city,
        zip: data.zip,
      });
      if (res?.data?.data?.form) {
        toast.error(res?.data?.data?.form[0]);
        setSubmitLoading(false);
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

  const handleClose = () => {
    onClose(), clearErrors();
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <form onSubmit={handleSubmit(addNewAddress)} className="">
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
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
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
            rules={{ required: 'zip is required' }}
            name="zip"
            label="Zip code"
            placeholder="zip code"
            type="number"
            wrapClassName="flex-1"
            error={errors?.zip}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-6 mt-2 sm:mt-4 lg:mt-8">
          <div className="flex-1">
            <Input
              prefix="+971"
              name="phone"
              control={control}
              rules={{
                required: 'phone number required',
                minLength: { value: 10, message: 'min 10' },
              }}
              label="Phone"
              placeholder="000-000-000"
              type="number"
              error={errors?.phone}
            />
          </div>
          <Input
            control={control}
            rules={{ required: 'address is required' }}
            name="address"
            label="Address"
            placeholder="Street, Building, Apt. etc"
            wrapClassName="flex-1"
            error={errors?.address}
          />
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
        <div className="md:flex items-center justify-end">
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
