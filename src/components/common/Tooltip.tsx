import React, { useState } from 'react'

type TooltipProps = {
  /** Tooltip text to be displayed */
  text: string;
  /** Tooltip position relative to the child element */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** The content that triggers the tooltip */
  children: React.ReactNode;
}

export default function Tooltip({ text, position = 'top', children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Ensures that position corresponds to one of the defined classes
  const positionClasses: Record<Required<TooltipProps>['position'], string> = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
        aria-describedby="tooltip"
      >
        {children}
      </div>
      {isVisible && (
        <div
          id="tooltip"
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm ${positionClasses[position]}`}
          role="tooltip"
        >
          {text}
          {/* Ensure custom CSS for the arrow if needed */}
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
}
