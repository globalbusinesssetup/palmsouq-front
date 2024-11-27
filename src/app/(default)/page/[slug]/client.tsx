'use client';
import { Loader } from '@/components';
import { getAbout } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Client = ({ params }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: () => getAbout(params.slug),
  });
  if (isLoading) {
    return <Loader />;
  }
  return <div dangerouslySetInnerHTML={{ __html: data?.data?.description! }} />;
};

export default Client;
