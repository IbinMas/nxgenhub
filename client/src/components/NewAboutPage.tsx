import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Mail, FileText, Linkedin, Twitter } from "lucide-react";

interface ContactTileProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  icon?: React.ReactNode;
}

const ContactTile = ({
  title,
  description,
  link,
  linkText = link,
  icon,
}: ContactTileProps) => {
  return (
    <div className="bg-white border border-[#eaeaea] p-4 sm:p-[20px] min-h-[180px] sm:min-h-[200px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 text-center flex flex-col justify-between">
      {icon && <div className="flex justify-center mb-3 sm:mb-4">{icon}</div>}
      <h3 className="text-[16px] sm:text-[18px] font-semibold mb-1 sm:mb-2 leading-[1.4]">
        {title}
      </h3>
      <p className="text-[13px] sm:text-[14px] text-gray-600 mb-2 sm:mb-3 leading-[1.4]">
        {description}
      </p>
      <a
        href={link}
        className="text-[13px] sm:text-[14px] font-bold text-black hover:underline leading-[1.4] break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const faqItems: FAQItemProps[] = [
  {
    question: "What services does your company offer?",
    answer:
      "We offer a comprehensive range of IT services including software development, cloud solutions, DevOps implementation, IT consulting, and managed services tailored to your business needs.",
  },
  {
    question: "Do you offer custom software development?",
    answer:
      "Yes, we specialize in custom software development to address your unique business challenges with tailored solutions that align perfectly with your requirements and objectives.",
  },
  {
    question: "Can you help us with cloud migration?",
    answer:
      "Absolutely! Our team has extensive experience in cloud migration services, helping businesses seamlessly transition their infrastructure and applications to AWS, Azure, Google Cloud, or other cloud platforms.",
  },
  {
    question: "How do you ensure the security of our data?",
    answer:
      "We implement industry-leading security practices including encryption, access controls, regular security audits, and compliance with relevant regulations to ensure your data remains protected at all times.",
  },
  {
    question: "Do you offer IT support after the project is completed?",
    answer:
      "Yes, we provide comprehensive post-project support and maintenance services to ensure your systems continue to operate efficiently and remain up-to-date with the latest security patches and improvements.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Project timelines vary depending on scope, complexity, and requirements. We work closely with you to establish realistic timelines and provide regular updates throughout the development process.",
  },
  {
    question: "Can you help with IT staff augmentation?",
    answer:
      "Yes, we offer IT staff augmentation services to supplement your existing team with skilled professionals who can provide specialized expertise for your projects or ongoing operations.",
  },
  {
    question: "What makes your company different from other IT firms?",
    answer:
      "Our client-centric approach, technical expertise, transparent communication, and commitment to delivering high-quality solutions that drive tangible business value set us apart from other IT firms.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Our pricing is customized based on project requirements, scope, and complexity. We offer competitive rates and work with you to develop solutions that fit your budget while delivering maximum value.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with clients across various industries including healthcare, finance, retail, manufacturing, education, and technology, adapting our solutions to meet industry-specific challenges and requirements.",
  },
  {
    question: "How do you stay updated with the latest technology trends?",
    answer:
      "Our team regularly participates in professional development, attends industry conferences, and engages in continuous learning to stay at the forefront of emerging technologies and best practices.",
  },
  {
    question: "Do you offer training for our team?",
    answer:
      "Yes, we provide comprehensive training programs to ensure your team can effectively use and maintain the solutions we implement, maximizing your return on investment.",
  },
  {
    question: "What is your approach to project management?",
    answer:
      "We follow agile methodologies with regular sprints, stand-ups, and client check-ins to ensure transparency, flexibility, and continuous alignment with your business objectives throughout the project lifecycle.",
  },
  {
    question: "How do I get in touch with your support team?",
    answer:
      "You can reach our support team via email at support@company.com, through our dedicated support portal, or by calling our support hotline at (555) 123-4567.",
  },
  {
    question: "What tools do you use for DevOps automation?",
    answer:
      "We utilize industry-leading tools such as Jenkins, Docker, Kubernetes, Terraform, Ansible, and GitLab CI/CD to automate and streamline your development and operations processes.",
  },
  {
    question: "Do you offer managed DevOps services?",
    answer:
      "Yes, we provide managed DevOps services to help you implement, optimize, and maintain your DevOps practices, allowing your team to focus on core business activities.",
  },
  {
    question: "How do you measure the success of a DevOps implementation?",
    answer:
      "We measure success through key metrics including deployment frequency, lead time for changes, mean time to recovery, and change failure rate, as well as broader business outcomes like improved time-to-market and customer satisfaction.",
  },
];

interface NewAboutPageProps {
  className?: string;
}

const NewAboutPage = ({ className = "" }: NewAboutPageProps) => {
  return (
    <section
      id="about-section"
      className={`w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white min-h-screen ${className}`}
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#333333",
        lineHeight: "1.5",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6 sm:mb-8">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              <rect width="50" height="50" x="5" y="5" rx="10" fill="#000000" />
              <path
                d="M20 15L25 15L40 45L35 45L20 15Z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
              <path
                d="M35 15L40 15L25 45L20 45L35 15Z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Contact Our Friendly Team
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
            Let us know how we can help.
          </p>
          <div className="w-16 sm:w-24 h-[1px] bg-[#eaeaea] mx-auto"></div>
        </motion.div>

        {/* Contact Tiles Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[16px] mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactTile
            title="Email Support"
            description="Reach our technical team"
            link="mailto:nxtgenhub15@gmail.com"
            linkText="nxtgenhub15@gmail.com"
            icon={
              <>
                <Mail size={24} className="text-black sm:hidden" />
                <Mail size={32} className="text-black hidden sm:block" />
              </>
            }
          />
          <ContactTile
            title="Get a Quote"
            description="Request project estimates"
            link="mailto:nxtgenhub15@gmail.com"
            linkText="nxtgenhub15@gmail.com"
            icon={
              <>
                <FileText size={24} className="text-black sm:hidden" />
                <FileText size={32} className="text-black hidden sm:block" />
              </>
            }
          />
          <ContactTile
            title="LinkedIn"
            description="Connect professionally"
            link="https://linkedin.com/company"
            linkText="linkedin.com/company"
            icon={
              <>
                <Linkedin size={24} className="text-black sm:hidden" />
                <Linkedin size={32} className="text-black hidden sm:block" />
              </>
            }
          />
          <ContactTile
            title="Twitter/X"
            description="See our latest updates"
            link="https://x.com/thenxtgenhub?s=21"
            linkText="@thenxtgenhub"
            icon={
              <>
                <Twitter size={24} className="text-black sm:hidden" />
                <Twitter size={32} className="text-black hidden sm:block" />
              </>
            }
          />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-10 sm:mb-16 max-w-full sm:max-w-[800px] mx-auto px-0 sm:px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center text-[#333333]">
            Frequently Asked Questions
          </h2>
          <div className="w-full">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="mb-3 bg-white border border-[#eaeaea] rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out overflow-hidden"
              >
                <details className="faq-item group">
                  <summary className="flex justify-between items-center p-3 sm:p-4 cursor-pointer text-[#333333] font-semibold text-[13px] sm:text-[14px] md:text-[16px]">
                    {item.question}
                    <div className="faq-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transform transition-transform duration-300 group-open:rotate-45"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-[#555555] text-[12px] sm:text-[14px] md:text-[15px] leading-[1.6]">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewAboutPage;
