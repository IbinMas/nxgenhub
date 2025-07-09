import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

interface SplashScreenPageProps {
  onComplete: () => void;
}

const SplashScreenPage = ({ onComplete }: SplashScreenPageProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const companyName = "NxtgenHub";

  useEffect(() => {
    // Start fade out after 1-1.2 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Call onComplete after fade animation completes
      setTimeout(onComplete, 800); // 0.8s fade duration
    }, 1100); // 1.1 seconds display time

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Container variants with upward motion
  const containerVariants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -50, // Upward motion
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Logo animation
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.1, 0.1, 0.3, 0.9],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.8 },
    },
  };

  // Text animation
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.1, 0.1, 0.3, 0.9],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.8 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        variants={containerVariants}
        initial="visible"
        animate={fadeOut ? "exit" : "visible"}
        exit="exit"
      >
        <div
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 px-4"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Logo */}
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20"
            variants={logoVariants}
            initial="hidden"
            animate={fadeOut ? "exit" : "visible"}
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient
                  id="splashLogoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>
              <rect
                width="100"
                height="100"
                rx="15"
                fill="url(#splashLogoGradient)"
              />
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
          </motion.div>

          {/* Company name */}
          <motion.div
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight"
            variants={textVariants}
            initial="hidden"
            animate={fadeOut ? "exit" : "visible"}
          >
            {companyName}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreenPage;
