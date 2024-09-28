
import { useState } from 'react';
import config from '@/config';
import NextImage from 'next/image';

const Image = ({ src, alt, defaultSrc, ...props }) => {
    const [imgSrc, setImgSrc] = useState(`${config.imgUri}${src}`);

    const handleError = () => {
        setImgSrc(defaultSrc);
    };

    return (
        <NextImage
            src={imgSrc}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
};

export default Image;
