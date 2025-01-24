import React from 'react';
// import Rating from 'react-rating';
import { MdStarBorder, MdStar } from 'react-icons/md';

const Rate = ({ ...rest }) => {
  return (
    <>
      <div className="">
        {/* <Rating 
                emptySymbol={<MdStarBorder className='text-secondary' />}  
                fullSymbol={<MdStar className='text-primary'/>} 
                fractions={2} 
                className="text-xl xs:text-2xl"
                {...rest}  /> */}
      </div>
    </>
  );
};

export default Rate;
