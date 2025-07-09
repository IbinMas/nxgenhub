import React from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = "" }: AboutSectionProps) => {
  return (
    <section
      id="about-section"
      className={`w-full py-20 px-4 md:px-8 lg:px-16 bg-gray-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">About NxtgenHub</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide cutting-edge IT solutions to help businesses transform
            and thrive in the digital era.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To empower businesses with innovative technology solutions that
              drive growth, efficiency, and competitive advantage in an
              ever-evolving digital landscape.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading technology partner for businesses seeking
              digital transformation, recognized for our expertise, reliability,
              and commitment to client success.
            </p>
          </motion.div>

          <motion.div
            className="rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Team collaboration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 16L6 10H18L12 16Z" fill="white" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Innovation</h4>
            <p className="text-gray-600">
              We constantly explore new technologies and methodologies to
              deliver cutting-edge solutions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"
                  fill="white"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Excellence</h4>
            <p className="text-gray-600">
              We are committed to delivering the highest quality in everything
              we do.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                  fill="white"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Partnership</h4>
            <p className="text-gray-600">
              We build lasting relationships with our clients based on trust and
              mutual success.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
