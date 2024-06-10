import React from 'react';

const ArrowRight = ({
  size = 24,
  color,
}: {
  size?: number | string;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
    >
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
        d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
      ></path>
    </svg>
  );
};

export default ArrowRight;
