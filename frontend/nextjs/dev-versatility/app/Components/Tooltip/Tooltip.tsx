import React, { useEffect, useRef, useState } from "react";
import styles from "./Tooltip.module.css";

type TooltipProps = {
  text: string;
  children: React.ReactNode | Iterable<React.ReactNode>;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const adjustTooltipPosition = () => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const isTooltipOffScreen =
        tooltipRect.left < 0 ||
        tooltipRect.right > window.innerWidth ||
        tooltipRect.top < 0 ||
        tooltipRect.bottom > window.innerHeight;

      if (
        isTooltipOffScreen &&
        tooltipRef.current &&
        tooltipRef.current.parentElement
      ) {
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const parentRect =
          tooltipRef.current.parentElement.getBoundingClientRect();

        let left = parentRect.left + parentRect.width / 2 - tooltipWidth / 2;
        let top = parentRect.top - tooltipHeight - 10;

        if (left < 0) {
          left = 0;
        } else if (left + tooltipWidth > window.innerWidth) {
          left = window.innerWidth - tooltipWidth;
        }

        if (top < 0) {
          top = 0;
        } else if (top + tooltipHeight > window.innerHeight) {
          top = window.innerHeight - tooltipHeight;
        }

        tooltipRef.current.style.left = `${left}px`;
        tooltipRef.current.style.top = `${top}px`;
      }
    }
  };

  useEffect(() => {
    if (showTooltip) {
      adjustTooltipPosition();
    }
  }, [showTooltip]);
  
  useEffect(() => {
    const handleWindowResize = () => {
      adjustTooltipPosition();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {showTooltip && !!text && (
        <div ref={tooltipRef} className={styles.tooltip}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
