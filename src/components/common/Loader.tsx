import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const Loader = () => {
  return (
    <div className="w-screen h-[80vh] flex items-center justify-center">
      <AiOutlineLoading size={40} className="animate-spin" />
    </div>
  );
};

export default Loader;
