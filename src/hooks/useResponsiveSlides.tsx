import { useState, useEffect } from 'react';
import useWindoWidth from './useWindowWidth';

const useResponsiveSlides = (
  breakpoints: { width: number; slide: number }[],
  defaultSlide?: number
) => {
  const windowWidth = useWindoWidth();
  const [currentSlide, setCurrentSlide] = useState(defaultSlide ?? 1); // Default slide value

  useEffect(() => {
    const getCurrentSlide = () => {
      for (const breakpoint of breakpoints) {
        if (windowWidth > breakpoint.width) {
          return breakpoint.slide;
        }
      }
      return breakpoints[breakpoints.length - 1].slide; // Fallback to the smallest width slide
    };

    setCurrentSlide(getCurrentSlide());
  }, [windowWidth, breakpoints, defaultSlide]);

  return currentSlide;
};

export default useResponsiveSlides;
