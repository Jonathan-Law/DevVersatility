import React, { useState, useEffect, ButtonHTMLAttributes } from 'react';

type HoverButtonProps = {
    callback: () => void,
    timeout?: number,
} & ButtonHTMLAttributes<HTMLButtonElement>;

const HoverButton = ({timeout = 1000, callback, children, ...rest}: HoverButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isHovered && !hasHovered) {
      timeoutId = setTimeout(() => {
        setHasHovered(true);
        callback?.();
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, hasHovered, isHovered, timeout]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setHasHovered(false);
    setIsHovered(false);
  };

  return (
    <button
    {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default HoverButton;
