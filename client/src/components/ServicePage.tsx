import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Monitor,
  TrendingUp,
  Edit3,
  Layers,
  Globe,
  Settings,
} from "lucide-react";

interface ServiceTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

const ServiceTile = ({
  title,
  description,
  icon,
  isHighlighted = false,
}: ServiceTileProps) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    // Store current scroll position and service section position
    const serviceSection = document.getElementById("service-section");
    const serviceSectionTop = serviceSection ? serviceSection.offsetTop : 0;
    sessionStorage.setItem(
      "servicePageScrollPosition",
      window.scrollY.toString(),
    );
    sessionStorage.setItem("serviceSectionTop", serviceSectionTop.toString());

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9-]/g, "");

    // Add a small delay to allow hover animation to complete
    setTimeout(() => {
      navigate(`/services/${slug}`);
    }, 100); // Reduced delay for faster feel
  };

  return (
    <motion.div
      className="p-6 sm:p-8 rounded-2xl transition-all duration-500 cursor-pointer group bg-gray-50 hover:bg-[#9AFF00] text-black hover:shadow-lg overflow-hidden"
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      initial={{ opacity: 0, y: 30, x: 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
      onClick={handleSeeMore}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-black">
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>
        <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-4">
          {description}
        </p>
        <motion.div
          className="text-sm font-medium text-black hover:text-gray-700 transition-colors duration-300 mt-auto cursor-pointer flex items-center group-hover:translate-x-1"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="mr-2">See More</span>
          <motion.span
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ServicePageProps {
  className?: string;
}

const ServicePage = ({ className = "" }: ServicePageProps) => {
  const services = [
    {
      title: "Cloud Integration & Migration",
      description:
        "Seamlessly migrate your infrastructure to the cloud with our expert guidance, ensuring minimal downtime and maximum efficiency.",
      icon: <Monitor size={32} />,
      isHighlighted: false,
    },
    {
      title: "CI/CD Implementation & Pipeline Automation",
      description:
        "Streamline your development process with automated CI/CD pipelines that accelerate deployment and improve code quality.",
      icon: <TrendingUp size={32} />,
      isHighlighted: false,
    },
    {
      title: "Azure DevOps Consulting",
      description:
        "Leverage Microsoft Azure's powerful DevOps tools to optimize your development lifecycle and enhance team collaboration.",
      icon: <Edit3 size={32} />,
      isHighlighted: false,
    },
    {
      title: "AWS DevOps Consulting",
      description:
        "Harness the full potential of Amazon Web Services with our comprehensive DevOps consulting and implementation services.",
      icon: <Layers size={32} />,
      isHighlighted: false,
    },
    {
      title: "Managed Cloud Services & Support",
      description:
        "Focus on your core business while we manage your cloud infrastructure with 24/7 monitoring and proactive support.",
      icon: <Globe size={32} />,
      isHighlighted: false,
    },
    {
      title: "Performance & Cost Optimization",
      description:
        "Maximize your cloud ROI through intelligent resource optimization and performance tuning strategies.",
      icon: <Settings size={32} />,
      isHighlighted: false,
    },
  ];

  return (
    <section
      id="service-section"
      className={`w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white ${className}`}
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#333333",
        lineHeight: "1.5",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceTile
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isHighlighted={service.isHighlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
