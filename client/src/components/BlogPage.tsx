import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

const BlogPost = ({
  title,
  excerpt,
  date,
  author,
  image,
  readTime,
}: BlogPostProps) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    // Store current scroll position and blog section position
    const blogSection = document.getElementById("blog-section");
    const blogSectionTop = blogSection ? blogSection.offsetTop : 0;
    sessionStorage.setItem("blogPageScrollPosition", window.scrollY.toString());
    sessionStorage.setItem("blogSectionTop", blogSectionTop.toString());

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Navigate with state to enable smooth back navigation
    navigate(`/blog/${slug}`, {
      state: {
        fromBlogList: true,
        previousScrollPosition: window.scrollY,
      },
    });
  };

  return (
    <motion.article
      className="bg-white border border-[#eaeaea] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group flex"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-1/3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="w-2/3 p-6 flex flex-col justify-center">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={16} className="mr-2" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <User size={16} className="mr-2" />
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-[#333333] group-hover:text-black transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{excerpt}</p>
        <button
          onClick={handleReadMore}
          className="flex items-center text-black font-medium hover:text-gray-700 transition-colors group self-start cursor-pointer"
        >
          Read More
          <ArrowRight
            size={16}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </motion.article>
  );
};

interface BlogPageProps {
  className?: string;
}

const BlogPage = ({ className = "" }: BlogPageProps) => {
  const [visiblePosts, setVisiblePosts] = useState(() => {
    // Restore visible posts count from session storage if available
    const savedVisiblePosts = sessionStorage.getItem("blogVisiblePosts");
    return savedVisiblePosts ? parseInt(savedVisiblePosts) : 6;
  });

  const allBlogPosts: BlogPostProps[] = [
    {
      title: "Infrastructure as Code: Best Practices",
      excerpt:
        "Learn how Infrastructure as Code (IaC) can revolutionize your IT operations. Discover tools like Terraform and Ansible to automate your infrastructure deployment and management.",
      date: "12/15/24",
      author: "DevOps Team",
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      readTime: "7 min read",
    },
    {
      title: "Modern DevOps Practices",
      excerpt:
        "Discover the latest trends in DevOps automation and how they can transform your development workflow. Learn about CI/CD pipelines, containerization, and cloud-native solutions.",
      date: "12/10/24",
      author: "Tech Team",
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      readTime: "8 min read",
    },
    {
      title: "Cloud Migration Strategies",
      excerpt:
        "A comprehensive guide to migrating your infrastructure to the cloud. Best practices, common pitfalls, and how to ensure a smooth transition for your business.",
      date: "12/05/24",
      author: "Cloud Team",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      readTime: "12 min read",
    },
    {
      title: "Automation in Software Development",
      excerpt:
        "How automation is revolutionizing software development processes. From testing to deployment, learn how to streamline your development lifecycle.",
      date: "11/30/24",
      author: "Dev Team",
      image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
      readTime: "6 min read",
    },
    {
      title: "Security Best Practices for DevOps",
      excerpt:
        "Implementing security throughout your DevOps pipeline. Learn about DevSecOps practices and how to build security into every stage of development.",
      date: "11/25/24",
      author: "Security Team",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
      readTime: "10 min read",
    },
    {
      title: "The Future of Cloud Computing",
      excerpt:
        "Exploring emerging trends in cloud technology and what they mean for businesses. From edge computing to serverless architectures.",
      date: "11/20/24",
      author: "Innovation Team",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      readTime: "7 min read",
    },
    {
      title: "Kubernetes Best Practices",
      excerpt:
        "Master container orchestration with Kubernetes. Learn about deployment strategies, scaling, and monitoring in production environments.",
      date: "11/15/24",
      author: "Platform Team",
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      readTime: "9 min read",
    },
    {
      title: "Microservices Architecture Guide",
      excerpt:
        "Design and implement scalable microservices architectures. Best practices for service communication, data management, and deployment.",
      date: "11/10/24",
      author: "Architecture Team",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      readTime: "11 min read",
    },
    {
      title: "Monitoring and Observability",
      excerpt:
        "Implement comprehensive monitoring solutions for your applications. Learn about metrics, logging, and distributed tracing.",
      date: "11/05/24",
      author: "SRE Team",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      readTime: "8 min read",
    },
  ];

  const displayedPosts = allBlogPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < allBlogPosts.length;

  const handleLoadMore = () => {
    setVisiblePosts((prev) => {
      const newCount = Math.min(prev + 3, allBlogPosts.length);
      // Store the new visible posts count in session storage
      sessionStorage.setItem("blogVisiblePosts", newCount.toString());
      return newCount;
    });
  };

  // Store visible posts count whenever it changes
  React.useEffect(() => {
    sessionStorage.setItem("blogVisiblePosts", visiblePosts.toString());
  }, [visiblePosts]);

  return (
    <section
      id="blog-section"
      className={`w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white ${className}`}
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#333333",
        lineHeight: "1.5",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#333333]">
            Our Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in
            technology and DevOps.
          </p>
        </motion.div>

        {/* Blog Posts List */}
        <div className="space-y-6 sm:space-y-8">
          {displayedPosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              image={post.image}
              readTime={post.readTime}
            />
          ))}
        </div>

        {/* Load More Section */}
        {hasMorePosts && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.button
              onClick={handleLoadMore}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Load More Posts
            </motion.button>
          </motion.div>
        )}

        {/* All Posts Loaded Message */}
        {!hasMorePosts && visiblePosts > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600">
              You've reached the end of our blog posts!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
