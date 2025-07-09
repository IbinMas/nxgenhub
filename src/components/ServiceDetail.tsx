import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface ServiceDetailProps {
  className?: string;
}

const ServiceDetail = ({ className = "" }: ServiceDetailProps) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock service data - in a real app, this would come from an API
  const services = {
    "cloud-integration-and-migration": {
      title: "Cloud Integration & Migration",
      description:
        "Seamlessly migrate your infrastructure to the cloud with our expert guidance, ensuring minimal downtime and maximum efficiency.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      features: [
        "Comprehensive cloud readiness assessment",
        "Multi-cloud and hybrid cloud strategies",
        "Zero-downtime migration planning",
        "Cost optimization and resource planning",
        "Security and compliance management",
        "24/7 migration support and monitoring",
      ],
      benefits: [
        "Reduced infrastructure costs by up to 40%",
        "Improved scalability and flexibility",
        "Enhanced security and compliance",
        "Faster deployment and time-to-market",
        "Better disaster recovery capabilities",
      ],
      process: [
        "Initial consultation and assessment",
        "Migration strategy development",
        "Proof of concept and testing",
        "Phased migration execution",
        "Post-migration optimization",
        "Ongoing support and maintenance",
      ],
    },
    "cicd-implementation-and-pipeline-automation": {
      title: "CI/CD Implementation & Pipeline Automation",
      description:
        "Streamline your development process with automated CI/CD pipelines that accelerate deployment and improve code quality.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      features: [
        "Custom CI/CD pipeline design",
        "Automated testing integration",
        "Multi-environment deployment",
        "Code quality gates and reviews",
        "Rollback and recovery mechanisms",
        "Performance monitoring and alerts",
      ],
      benefits: [
        "Faster release cycles and deployment frequency",
        "Reduced manual errors and improved quality",
        "Better collaboration between teams",
        "Increased developer productivity",
        "Enhanced code reliability and stability",
      ],
      process: [
        "Current workflow analysis",
        "Pipeline architecture design",
        "Tool selection and integration",
        "Automated testing setup",
        "Deployment automation",
        "Team training and handover",
      ],
    },
    "azure-devops-consulting": {
      title: "Azure DevOps Consulting",
      description:
        "Leverage Microsoft Azure's powerful DevOps tools to optimize your development lifecycle and enhance team collaboration.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      features: [
        "Azure DevOps Services setup and configuration",
        "Azure Boards for project management",
        "Azure Repos for source control",
        "Azure Pipelines for CI/CD",
        "Azure Test Plans for quality assurance",
        "Azure Artifacts for package management",
      ],
      benefits: [
        "Integrated Microsoft ecosystem",
        "Scalable and secure cloud platform",
        "Advanced analytics and reporting",
        "Seamless integration with existing tools",
        "Enterprise-grade security and compliance",
      ],
      process: [
        "Azure environment assessment",
        "DevOps strategy planning",
        "Azure DevOps configuration",
        "Migration and integration",
        "Team training and adoption",
        "Ongoing optimization and support",
      ],
    },
    "aws-devops-consulting": {
      title: "AWS DevOps Consulting",
      description:
        "Harness the full potential of Amazon Web Services with our comprehensive DevOps consulting and implementation services.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      features: [
        "AWS CodePipeline and CodeBuild setup",
        "Infrastructure as Code with CloudFormation",
        "Container orchestration with ECS and EKS",
        "Serverless architecture implementation",
        "AWS monitoring and logging solutions",
        "Security best practices and compliance",
      ],
      benefits: [
        "Native AWS service integration",
        "Cost-effective scaling solutions",
        "High availability and fault tolerance",
        "Advanced security and compliance features",
        "Global infrastructure reach",
      ],
      process: [
        "AWS environment assessment",
        "Architecture design and planning",
        "Service configuration and setup",
        "Migration and deployment",
        "Performance optimization",
        "Ongoing support and maintenance",
      ],
    },
    "managed-cloud-services-and-support": {
      title: "Managed Cloud Services & Support",
      description:
        "Focus on your core business while we manage your cloud infrastructure with 24/7 monitoring and proactive support.",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
      features: [
        "24/7 infrastructure monitoring",
        "Proactive issue resolution",
        "Performance optimization",
        "Security patch management",
        "Backup and disaster recovery",
        "Cost monitoring and optimization",
      ],
      benefits: [
        "Reduced operational overhead",
        "Improved system reliability",
        "Expert technical support",
        "Predictable monthly costs",
        "Focus on core business activities",
      ],
      process: [
        "Infrastructure assessment",
        "Service level agreement definition",
        "Monitoring setup and configuration",
        "Team onboarding and training",
        "Ongoing management and support",
        "Regular performance reviews",
      ],
    },
    "performance-and-cost-optimization": {
      title: "Performance & Cost Optimization",
      description:
        "Maximize your cloud ROI through intelligent resource optimization and performance tuning strategies.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      features: [
        "Resource utilization analysis",
        "Cost optimization recommendations",
        "Performance bottleneck identification",
        "Auto-scaling configuration",
        "Reserved instance planning",
        "Continuous monitoring and alerts",
      ],
      benefits: [
        "Significant cost savings",
        "Improved application performance",
        "Better resource utilization",
        "Enhanced user experience",
        "Predictable cost management",
      ],
      process: [
        "Current state analysis",
        "Optimization opportunity identification",
        "Implementation planning",
        "Gradual optimization rollout",
        "Performance monitoring",
        "Continuous improvement",
      ],
    },
  };

  const service = slug ? services[slug as keyof typeof services] : null;

  if (!service) {
    return (
      <div
        className={`min-h-screen bg-white flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-black hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => {
            // Get saved scroll position
            const savedPosition = sessionStorage.getItem(
              "servicePageScrollPosition",
            );

            // Navigate back to home with smooth back transition and service section restoration
            navigate("/", {
              state: {
                isBackNavigation: true,
                fromPage: "service-detail",
                scrollTo: "service-section",
                targetPosition: savedPosition ? parseInt(savedPosition) : null,
                instantScroll: true, // Enable instant scroll to prevent flash
              },
            });

            // Clean up scroll position from session storage
            sessionStorage.removeItem("servicePageScrollPosition");
            sessionStorage.removeItem("serviceSectionTop");
          }}
          className="flex items-center text-black hover:text-gray-700 transition-all duration-300 mb-8 group"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
          whileHover={{
            x: -5,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <motion.div
            className="mr-2"
            animate={{ x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ArrowLeft size={20} />
          </motion.div>
          Back to Services
        </motion.button>

        {/* Service Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333]">
            {service.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            {service.description}
          </p>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </motion.header>

        {/* Service Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Features */}
          <motion.div
            className="bg-gray-50 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-[#333333]">
              Key Features
            </h2>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle
                    size={16}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="bg-[#9AFF00] bg-opacity-20 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4 text-[#333333]">Benefits</h2>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle
                    size={16}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Process */}
          <motion.div
            className="bg-gray-50 p-6 rounded-lg md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-[#333333]">
              Our Process
            </h2>
            <ol className="space-y-2">
              {service.process.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="bg-black text-white p-8 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how our {service.title.toLowerCase()} services can
            transform your business operations and accelerate your digital
            transformation journey.
          </p>
          <button className="bg-[#9AFF00] text-black px-8 py-3 rounded-full hover:bg-[#8AEF00] transition-colors duration-200 font-medium">
            Talk to an Expert
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
