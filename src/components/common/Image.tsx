'use client';
import { useState } from 'react';
import config from '@/config';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'src' | 'alt'> {
    /** 
     * The source path for the image.
     * Should be a relative path (e.g., "images/photo.jpg") which is prefixed with `config.imgUri`.
     */
    src?: string;
    
    /** 
     * Alternative text for the image, used for accessibility.
     * @default ""
     */
    alt?: string;
    
    /** 
     * Fallback source path used if the primary image fails to load.
     * Should also be a relative path.
     * 
     * @example "images/default.jpg"
     */
    defaultSrc?: string;

    /**
     * Is src props a local pathname or remote
     * @default false;
     * @example true | false;
     */
    isLocal?: boolean;
}

/**
 * A custom Image component that handles errors by switching to a default image.
 *
 * @param {ImageProps} props - Props for configuring the image source, alternative text, and error handling.
 * @returns A Next.js Image component with error handling capabilities.
 */
const Image: React.FC<ImageProps> = ({ src, alt = '', defaultSrc, isLocal, ...props }) => {
    const fallbackSrc = `${config.imgUri}${defaultSrc ?? config.defaultImage}`;
    const [imgSrc, setImgSrc] = useState<string>(`${!isLocal ? config.imgUri : ''}${src}`);
    /**
     * Handles image load errors by switching to a fallback image if the main image fails to load.
     */

    const handleError = () => {
        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
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
