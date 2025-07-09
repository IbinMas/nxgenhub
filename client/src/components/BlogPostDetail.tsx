import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface BlogPostDetailProps {
  className?: string;
}

const BlogPostDetail = ({ className = "" }: BlogPostDetailProps) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create slug from title for matching
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Mock blog post data - in a real app, this would come from an API
  const allBlogPosts = [
    {
      title: "Infrastructure as Code: Best Practices",
      date: "12/15/24",
      author: "DevOps Team",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      content: `
        <h2>Introduction to Infrastructure as Code</h2>
        <p>Infrastructure as Code (IaC) has revolutionized the way we manage and deploy IT infrastructure. By treating infrastructure configuration as code, teams can achieve greater consistency, reliability, and scalability in their operations.</p>
        
        <h2>Key Benefits of IaC</h2>
        <ul>
          <li><strong>Consistency:</strong> Eliminate configuration drift and ensure environments are identical</li>
          <li><strong>Version Control:</strong> Track changes and maintain history of infrastructure modifications</li>
          <li><strong>Automation:</strong> Reduce manual errors and speed up deployment processes</li>
          <li><strong>Scalability:</strong> Easily replicate environments and scale resources</li>
        </ul>
        
        <h2>Popular IaC Tools</h2>
        <h3>Terraform</h3>
        <p>HashiCorp Terraform is one of the most popular IaC tools, offering a declarative approach to infrastructure management. It supports multiple cloud providers and on-premises solutions.</p>
        
        <h3>Ansible</h3>
        <p>Red Hat Ansible provides both configuration management and infrastructure provisioning capabilities. Its agentless architecture makes it easy to adopt and maintain.</p>
        
        <h2>Best Practices</h2>
        <ol>
          <li><strong>Use Version Control:</strong> Store all IaC code in version control systems like Git</li>
          <li><strong>Implement Testing:</strong> Test your infrastructure code before deployment</li>
          <li><strong>Follow DRY Principles:</strong> Don't repeat yourself - use modules and templates</li>
          <li><strong>Document Everything:</strong> Maintain clear documentation for your infrastructure code</li>
          <li><strong>Implement Security:</strong> Use secrets management and follow security best practices</li>
        </ol>
        
        <h2>Getting Started</h2>
        <p>To begin your IaC journey, start small with a simple project. Choose a tool that aligns with your team's expertise and gradually expand your implementation. Remember that IaC is not just about tools - it's about adopting a mindset of treating infrastructure as software.</p>
        
        <h2>Conclusion</h2>
        <p>Infrastructure as Code is no longer optional in modern IT operations. By implementing IaC best practices, organizations can achieve greater efficiency, reliability, and scalability in their infrastructure management. Start your IaC journey today and transform how your team manages infrastructure.</p>
      `,
    },
    {
      title: "Modern DevOps Practices",
      date: "12/10/24",
      author: "Tech Team",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      content: `
        <h2>The Evolution of DevOps</h2>
        <p>DevOps has evolved significantly over the past decade, transforming from a cultural movement to a comprehensive set of practices and tools that enable organizations to deliver software faster and more reliably.</p>
        
        <h2>Core DevOps Principles</h2>
        <ul>
          <li><strong>Collaboration:</strong> Breaking down silos between development and operations teams</li>
          <li><strong>Automation:</strong> Automating repetitive tasks to reduce errors and increase efficiency</li>
          <li><strong>Continuous Integration/Continuous Deployment:</strong> Implementing CI/CD pipelines for faster delivery</li>
          <li><strong>Monitoring and Feedback:</strong> Continuous monitoring and rapid feedback loops</li>
        </ul>
        
        <h2>Modern DevOps Tools and Technologies</h2>
        <h3>Containerization</h3>
        <p>Docker and Kubernetes have revolutionized application deployment and orchestration, enabling consistent environments across development, testing, and production.</p>
        
        <h3>CI/CD Pipelines</h3>
        <p>Tools like Jenkins, GitLab CI, and GitHub Actions automate the build, test, and deployment processes, enabling teams to deliver code changes more frequently and reliably.</p>
        
        <h3>Infrastructure as Code</h3>
        <p>Terraform, Ansible, and CloudFormation allow teams to manage infrastructure through code, ensuring consistency and repeatability.</p>
        
        <h2>Cloud-Native DevOps</h2>
        <p>The shift to cloud-native architectures has introduced new DevOps practices, including microservices architecture, serverless computing, and cloud-native monitoring solutions.</p>
        
        <h2>Security Integration (DevSecOps)</h2>
        <p>Modern DevOps practices integrate security throughout the development lifecycle, shifting security left and making it everyone's responsibility.</p>
        
        <h2>Measuring Success</h2>
        <p>Key metrics for DevOps success include deployment frequency, lead time for changes, mean time to recovery, and change failure rate. These metrics help teams continuously improve their processes.</p>
      `,
    },
    {
      title: "Cloud Migration Strategies",
      date: "12/05/24",
      author: "Cloud Team",
      readTime: "12 min read",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      content: `
        <h2>Understanding Cloud Migration</h2>
        <p>Cloud migration is the process of moving digital business operations into the cloud. It's a comprehensive strategy that requires careful planning and execution.</p>
        
        <h2>Migration Strategies</h2>
        <ul>
          <li><strong>Lift and Shift:</strong> Moving applications as-is to the cloud</li>
          <li><strong>Refactoring:</strong> Modifying applications to take advantage of cloud features</li>
          <li><strong>Rearchitecting:</strong> Redesigning applications for cloud-native architecture</li>
        </ul>
        
        <h2>Best Practices</h2>
        <p>Successful cloud migration requires thorough assessment, proper planning, and phased implementation to minimize risks and ensure business continuity.</p>
      `,
    },
    {
      title: "Automation in Software Development",
      date: "11/30/24",
      author: "Dev Team",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
      content: `
        <h2>The Power of Automation</h2>
        <p>Automation in software development streamlines processes, reduces errors, and accelerates delivery cycles.</p>
        
        <h2>Key Areas for Automation</h2>
        <ul>
          <li>Testing and Quality Assurance</li>
          <li>Build and Deployment Processes</li>
          <li>Code Review and Analysis</li>
          <li>Environment Provisioning</li>
        </ul>
      `,
    },
    {
      title: "Security Best Practices for DevOps",
      date: "11/25/24",
      author: "Security Team",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      content: `
        <h2>DevSecOps Integration</h2>
        <p>Security must be integrated throughout the DevOps pipeline, not treated as an afterthought.</p>
        
        <h2>Security Practices</h2>
        <ul>
          <li>Automated Security Testing</li>
          <li>Container Security Scanning</li>
          <li>Infrastructure Security</li>
          <li>Compliance Monitoring</li>
        </ul>
      `,
    },
    {
      title: "The Future of Cloud Computing",
      date: "11/20/24",
      author: "Innovation Team",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
      content: `
        <h2>Emerging Cloud Trends</h2>
        <p>The future of cloud computing includes edge computing, serverless architectures, and AI-driven automation.</p>
        
        <h2>Key Innovations</h2>
        <ul>
          <li>Edge Computing</li>
          <li>Serverless Functions</li>
          <li>Multi-Cloud Strategies</li>
          <li>AI and Machine Learning Integration</li>
        </ul>
      `,
    },
    {
      title: "Kubernetes Best Practices",
      date: "11/15/24",
      author: "Platform Team",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      content: `
        <h2>Mastering Kubernetes</h2>
        <p>Kubernetes orchestration requires understanding of pods, services, deployments, and scaling strategies.</p>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Resource Management</li>
          <li>Security Policies</li>
          <li>Monitoring and Logging</li>
          <li>Backup and Recovery</li>
        </ul>
      `,
    },
    {
      title: "Microservices Architecture Guide",
      date: "11/10/24",
      author: "Architecture Team",
      readTime: "11 min read",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      content: `
        <h2>Microservices Design</h2>
        <p>Microservices architecture breaks down applications into smaller, independent services that communicate over well-defined APIs.</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li>Service Independence</li>
          <li>API-First Design</li>
          <li>Data Isolation</li>
          <li>Fault Tolerance</li>
        </ul>
      `,
    },
    {
      title: "Monitoring and Observability",
      date: "11/05/24",
      author: "SRE Team",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      content: `
        <h2>Observability Strategy</h2>
        <p>Comprehensive monitoring includes metrics, logs, and traces to provide full visibility into system behavior.</p>
        
        <h2>Monitoring Tools</h2>
        <ul>
          <li>Prometheus and Grafana</li>
          <li>ELK Stack</li>
          <li>Distributed Tracing</li>
          <li>APM Solutions</li>
        </ul>
      `,
    },
  ];

  // Find the post by matching the slug
  const post = allBlogPosts.find((p) => createSlug(p.title) === slug);

  if (!post) {
    return (
      <div
        className={`min-h-screen bg-white flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
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

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => {
            // Get saved scroll position
            const savedPosition = sessionStorage.getItem(
              "blogPageScrollPosition",
            );

            // Navigate back to home with smooth back transition and blog section restoration
            navigate("/", {
              state: {
                isBackNavigation: true,
                fromPage: "blog-detail",
                scrollTo: "blog-section",
                instantScroll: true,
                targetPosition: savedPosition ? parseInt(savedPosition) : null,
                restoreBlogState: true,
              },
            });

            // Clean up scroll position from session storage but keep blog state
            sessionStorage.removeItem("blogPageScrollPosition");
            sessionStorage.removeItem("blogSectionTop");
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
          Back to Blog
        </motion.button>

        {/* Article Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333]">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-6">
            <Calendar size={16} className="mr-2" />
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <User size={16} className="mr-2" />
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </motion.header>

        {/* Article Content */}
        <motion.article
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            color: "#333333",
            lineHeight: "1.7",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-[#333333] [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-[#333333] [&>p]:mb-4 [&>p]:text-gray-700 [&>ul]:mb-4 [&>ul]:pl-6 [&>ol]:mb-4 [&>ol]:pl-6 [&>li]:mb-2 [&>li]:text-gray-700"
          />
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
