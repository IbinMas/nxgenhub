import React from "react";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: string;
}

const Logo = ({
  className = "",
  size = "medium",
  color = "black",
}: LogoProps) => {
  // Size mapping
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="15" fill="url(#logoGradient)" />
        <path
          d="M30 25L40 25L70 75L60 75L30 25Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
        />
        <path
          d="M60 25L70 25L40 75L30 75L60 25Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};

export default Logo;
