import React from "react";
import { motion } from "framer-motion";

interface ArrowButtonProps {
  onClick?: () => void;
  className?: string;
}

const ArrowButton = ({ onClick, className = "" }: ArrowButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      whileHover={{ y: 5 }}
      className={`cursor-pointer bg-transparent border-none p-0 ${className}`}
      onClick={handleClick}
      aria-label="Scroll to about section"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-black stroke-[3]"
      >
        <line x1="20" y1="2" x2="20" y2="25" strokeLinecap="round" />
        <path
          d="M10 25L20 35L30 25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};

export default ArrowButton;
