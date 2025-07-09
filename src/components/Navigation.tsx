import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { Menu } from "lucide-react";

interface NavigationProps {
  onLoginClick?: () => void;
  onTalkToExpertClick?: () => void;
}

const Navigation = ({
  onLoginClick = () => {},
  onTalkToExpertClick = () => {},
}: NavigationProps) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = ["home", "about", "service", "blog", "contact"];

      // Check if we're at the top of the page
      if (scrollPosition < 100) {
        setActiveSection("home");
        return;
      }

      // Check which section is currently in view
      let foundActiveSection = false;
      for (const section of sections) {
        const element = document.getElementById(`${section}-section`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            foundActiveSection = true;
            break;
          }
        }
      }

      // If no section is found and we're near the top, default to home
      if (!foundActiveSection && scrollPosition < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        mobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Handle navigation click for both mobile and desktop
  const handleNavClick = (section: string, callback?: () => void) => {
    // Immediately set the active section
    setActiveSection(section);

    if (callback) callback();

    const sectionElement = document.getElementById(`${section}-section`);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (section === "home") {
      // If home section doesn't exist, scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  // Handle Get Started Here button click - navigate to dedicated page
  const handleGetStartedClick = () => {
    navigate("/get-started", {
      state: {
        fromPage: "homepage",
      },
    });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white flex items-center justify-between px-4 sm:px-8 md:px-16 z-[100] shadow-sm">
      {/* Logo and Company Name */}
      <div className="flex items-center">
        <Logo className="mr-2 sm:mr-3 h-8 w-8 sm:h-10 sm:w-10" />
        <span className="text-lg sm:text-xl font-bold text-black">
          NxtgenHub
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 mobile-menu z-[100]">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className={`text-${activeSection === "home" ? "black font-medium" : "gray-600"} py-2`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className={`text-${activeSection === "about" ? "black font-medium" : "gray-600"} py-2`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              About
            </a>
            <a
              href="#services"
              className={`text-${activeSection === "service" ? "black font-medium" : "gray-600"} py-2`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("service");
              }}
            >
              Services
            </a>
            <a
              href="#blog"
              className={`text-${activeSection === "blog" ? "black font-medium" : "gray-600"} py-2`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("blog");
              }}
            >
              Blog
            </a>
            <a
              href="#contact"
              className={`text-${activeSection === "contact" ? "black font-medium" : "gray-600"} py-2`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>
            <Button
              onClick={handleGetStartedClick}
              className="rounded-full bg-black text-white hover:bg-black/90 shadow-md hover:shadow-lg transition-all duration-200 w-full mt-2"
              variant="default"
            >
              Get Started Here
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Navigation Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <a
          href="#"
          className={`text-${activeSection === "home" ? "black font-medium" : "gray-600"} hover:text-black transition-all duration-300 animate-fadeIn`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
        >
          Home
        </a>
        <a
          href="#about"
          className={`text-${activeSection === "about" ? "black font-medium" : "gray-600"} hover:text-black transition-all duration-300 animate-fadeIn animation-delay-100`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("about");
          }}
        >
          About
        </a>
        <a
          href="#services"
          className={`text-${activeSection === "service" ? "black font-medium" : "gray-600"} hover:text-black transition-all duration-300 animate-fadeIn animation-delay-200`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("service");
          }}
        >
          Services
        </a>
        <a
          href="#blog"
          className={`text-${activeSection === "blog" ? "black font-medium" : "gray-600"} hover:text-black transition-all duration-300 animate-fadeIn animation-delay-300`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("blog");
          }}
        >
          Blog
        </a>
        <a
          href="#contact"
          className={`text-${activeSection === "contact" ? "black font-medium" : "gray-600"} hover:text-black transition-all duration-300 animate-fadeIn animation-delay-300`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("contact");
          }}
        >
          Contact
        </a>
      </div>

      {/* Desktop CTA Button */}
      <div className="hidden md:flex items-center">
        <Button
          onClick={handleGetStartedClick}
          className="rounded-full bg-black text-white hover:bg-black/90 shadow-md hover:shadow-lg transition-all duration-200 px-6"
          variant="default"
        >
          Get Started Here
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
