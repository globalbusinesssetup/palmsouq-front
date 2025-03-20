import React, { useState } from 'react';
import Image from 'next/image';
import config from '@/config';

const ImageMagnifier: React.FC<{ product: any; selectedImage?: string }> = ({
  product,
  selectedImage,
}) => {
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // percentage position
    const y = ((e.clientY - top) / height) * 100;

    // Set both magnifier position and image dimensions
    setMagnifierPosition({ x, y });
    setDimensions({ width, height });
  };

  const handleMouseEnter = () => setShowMagnifier(true);
  const handleMouseLeave = () => setShowMagnifier(false);

  return (
    <div className="hidden lg:block w-full h-60 xs:h-[300px] sm:h-[396px] rounded-lg relative">
      {/* Original Image Section */}
      <div
        className="w-full h-full relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={
            selectedImage
              ? `${config.imgUri + selectedImage}`
              : `${config.imgUri + product?.image}`
          }
          fill
          alt={product?.image ?? 'product image'}
          className="object-contain"
        />
        {showMagnifier && (
          <div
            className="absolute pointer-events-none border-2 border-white rounded-full"
            style={{
              width: '100px',
              height: '100px',
              top: `calc(${magnifierPosition.y}% - 50px)`, // dynamically center the magnifier
              left: `calc(${magnifierPosition.x}% - 50px)`,
              background: `url(${
                selectedImage
                  ? `${config.imgUri + selectedImage}`
                  : `${config.imgUri + product?.image}`
              })`,
              backgroundSize: '200%', // Magnified size
              backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
              transform: 'scale(1.5)', // Optional: to make the zoom more pronounced
            }}
          />
        )}
      </div>

      {/* Magnified Image Section */}
      {showMagnifier && (
        <div className="size-[500px] max-h-[500px] h-full overflow-hidden absolute -top-2 -right-[520px] rounded-lg">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${
                selectedImage
                  ? `${config.imgUri + selectedImage}`
                  : `${config.imgUri + product?.image}`
              })`,
              backgroundSize: '200%', // Increase the size for magnification effect
              backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
