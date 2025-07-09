import React from "react";
import { motion } from "framer-motion";

interface LaptopMockupProps {
  className?: string;
}

const LaptopMockup = ({ className = "" }: LaptopMockupProps) => {
  return (
    <section className={`w-full py-16 px-4 md:px-8 lg:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative w-4/5 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Laptop Frame */}
          <div className="relative w-full pt-[56.25%] bg-gray-800 rounded-t-xl overflow-hidden">
            {/* Screen Content */}
            <div className="absolute inset-[2%] top-[2%] bottom-[2%] bg-gray-900 rounded overflow-hidden">
              {/* Dashboard Screenshot */}
              <div className="w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
                  alt="DevOps Dashboard"
                  className="w-full h-full object-cover"
                />
                {/* Fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
              </div>
            </div>
          </div>
          {/* Laptop Base */}
          <div className="w-[102%] h-[15px] bg-gray-700 mx-auto -ml-[1%] rounded-b-lg"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaptopMockup;
