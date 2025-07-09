import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ArrowButton from "./ArrowButton";

interface HeroSectionProps {
  className?: string;
  onAboutClick?: () => void;
  onTalkToExpertClick?: () => void;
}

const HeroSection = ({
  className = "",
  onAboutClick = () => {},
  onTalkToExpertClick = () => {},
}: HeroSectionProps) => {
  const navigate = useNavigate();

  // Handle Talk to an Expert button click - navigate to dedicated page
  const handleTalkToExpertClick = () => {
    navigate("/talk-to-expert", {
      state: {
        fromPage: "homepage",
      },
    });
  };
  return (
    <section
      className={`w-full min-h-[600px] sm:min-h-[700px] bg-white pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 md:px-8 lg:px-16 relative ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Text Content */}

          <motion.div
            className="mb-6 sm:mb-8 mt-4 sm:mt-6 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={handleTalkToExpertClick}
              className="bg-white text-black border border-gray-200 px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
            >
              Talk to an expert
            </button>
          </motion.div>
          <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto text-center px-2">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block bg-gradient-to-b from-black/40 to-black bg-clip-text text-transparent">
                  Simplify IT.
                </span>
                <span className="block bg-gradient-to-b from-black/40 to-black bg-clip-text text-transparent">
                  Empower Growth
                </span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 sm:mt-6 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Tailored IT consulting to optimize, innovate,
                <span className="hidden sm:inline">
                  <br />
                </span>
                <span className="sm:hidden"> </span>
                and scale your business
              </motion.p>
            </div>
          </div>

          {/* Server Image with Enhanced 3D Effect */}
          <motion.div
            className="w-[90%] sm:w-3/4 mx-auto mt-10 sm:mt-16 relative z-[5]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <div
              className="relative transform transition-all duration-500 ease-out"
              style={{
                perspective: "1500px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Shadow underneath for 3D effect */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-0 right-0 h-8 sm:h-12 bg-black/10 blur-xl rounded-full mx-4 sm:mx-8"></div>

              {/* Main image container with 3D transform */}
              <motion.div
                className="w-full aspect-[16/9] relative overflow-hidden rounded-xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(5deg) rotateY(-2deg) translateZ(20px)",
                  boxShadow:
                    "0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 0 20px -5px rgba(0, 0, 0, 0.1)",
                }}
                whileHover={{
                  scale: 1.02,
                  rotateX: 0,
                  rotateY: 0,
                  transition: { duration: 0.4 },
                }}
              >
                {/* Frame around image */}
                <div
                  className="absolute inset-0 border border-black/5 rounded-xl z-20 pointer-events-none"
                  style={{ transform: "translateZ(2px)" }}
                ></div>

                {/* The actual image */}
                <motion.img
                  src="/homepage-thumbnail.jpg"
                  alt="DevOps CI/CD pipeline dashboard"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                />

                {/* Lighting effects for 3D appearance */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-60"
                  style={{ transform: "translateZ(1px)" }}
                ></div>
                <div
                  className="absolute inset-0 bg-gradient-to-bl from-white/30 via-transparent to-transparent opacity-50"
                  style={{ transform: "translateZ(1px)" }}
                ></div>

                {/* Reflection effect on top */}
                <div
                  className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent opacity-40"
                  style={{ transform: "translateZ(1px)" }}
                ></div>

                {/* Bottom fade */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-black/30 to-transparent"
                  style={{ transform: "translateZ(1px)" }}
                ></div>
              </motion.div>
            </div>
          </motion.div>

          {/* White fade effect at the bottom of the hero section */}
          <div className="absolute left-0 right-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent z-0" />

          {/* Arrow pointing down at bottom left - hidden on small screens */}
          <div className="hidden sm:block absolute bottom-8 left-4 sm:left-8 md:left-16 z-20">
            <ArrowButton
              onClick={() => {
                // Call the onAboutClick prop
                onAboutClick();

                // Use requestAnimationFrame for smoother scrolling
                requestAnimationFrame(() => {
                  const aboutSection = document.getElementById("about-section");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    // If the about section doesn't exist on the current page, try to navigate to it
                    const aboutLink =
                      document.querySelector('a[href="#about"]');
                    if (aboutLink) {
                      (aboutLink as HTMLElement).click();
                    }
                  }
                });
              }}
            />
          </div>

          {/* Logo at bottom right - hidden on small screens */}
          <div className="hidden sm:block absolute bottom-8 right-4 sm:right-8 md:right-16 z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Logo size="large" className="opacity-100" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
