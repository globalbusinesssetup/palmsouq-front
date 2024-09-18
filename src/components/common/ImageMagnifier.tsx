import React, { useState, useRef } from 'react';

const ProductImageMagnifier = ({ src, alt }: { src: string; alt: string }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  // Define the ref with the correct type
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Ensure imgRef.current is not null before accessing it
    if (imgRef.current) {
      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setBackgroundPosition(`${x}% ${y}%`);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef} // Attach the ref to the image
        src={src}
        alt={alt}
        className="object-cover w-full h-auto"
      />
      {isZoomed && (
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: '200%', // adjust as per your zoom preference
            backgroundPosition: backgroundPosition,
          }}
        />
      )}
    </div>
  );
};

export default ProductImageMagnifier;
