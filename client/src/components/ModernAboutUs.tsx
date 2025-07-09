import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

interface ModernAboutUsProps {
  className?: string;
}

const ModernAboutUs = ({ className = "" }: ModernAboutUsProps) => {
  const teamMembers: TeamMember[] = [
    {
      name: "Alex Johnson",
      title: "CEO & Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      name: "Sarah Williams",
      title: "CTO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      title: "Lead Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Emma Rodriguez",
      title: "DevOps Engineer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  ];

  const faqItems = [
    {
      question: "What industries do you specialize in?",
      answer:
        "We specialize in fintech, healthcare, e-commerce, and enterprise solutions. Our team has extensive experience working with businesses across these sectors, delivering tailored solutions that address industry-specific challenges and requirements.",
    },
    {
      question: "How do you handle project timelines?",
      answer:
        "We follow an agile methodology with clear milestones and regular check-ins. Our project management approach ensures transparency, flexibility, and on-time delivery while maintaining the highest quality standards throughout the development process.",
    },
    {
      question: "Can you integrate with our existing tools?",
      answer:
        "Absolutely! We pride ourselves on creating solutions that seamlessly integrate with your current tech stack. Our team has experience working with a wide range of technologies and can ensure smooth integration with your existing tools and systems.",
    },
  ];

  return (
    <div className={`w-full bg-white ${className}`}>
      {/* Hero Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Who We Are
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We empower businesses with cutting-edge IT solutions tailored for
            growth, helping you navigate the complexities of digital
            transformation.
          </motion.p>
        </div>
      </section>

      {/* Key Features/Cards Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-6">🛠️</div>
              <h3 className="text-xl font-semibold mb-4">Expertise</h3>
              <p className="text-gray-600">
                <em>10+ years in software development and DevOps.</em> Our team
                brings extensive experience across various industries and
                technologies.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-6">💡</div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We automate and optimize for scalability. Our solutions are
                designed to grow with your business and adapt to changing
                requirements.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-6">24/7</div>
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <p className="text-gray-600">
                Dedicated post-launch assistance. Our team is always available
                to help you with any issues or questions you may have.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Meet the Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Team
            </motion.button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Common Questions
          </motion.h2>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="text-lg font-medium py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default ModernAboutUs;
