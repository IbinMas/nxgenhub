import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicePage from "./ServicePage";
import BlogPage from "./BlogPage";
import NewAboutPage from "./NewAboutPage";

const Home = () => {
  const location = useLocation();

  // Handle navigation state for scrolling to specific sections
  useEffect(() => {
    if (location.state?.scrollTo) {
      // For back navigation with target position, scroll immediately to prevent flash
      if (
        location.state.isBackNavigation &&
        location.state.targetPosition !== null
      ) {
        // Immediate scroll to prevent flash
        window.scrollTo({
          top: location.state.targetPosition,
          behavior: "instant",
        });
        return;
      }

      const timer = setTimeout(
        () => {
          const element = document.getElementById(location.state.scrollTo);
          if (element) {
            // Check if this is an instant scroll from blog return
            if (location.state.instantScroll && location.state.targetPosition) {
              // For back navigation or instant navigation, scroll immediately
              const scrollDelay = location.state.skipTransition
                ? 50
                : location.state.isBackNavigation
                  ? 350 // Slightly faster for back navigation
                  : location.state.restoreBlogState
                    ? 450
                    : 400;
              setTimeout(() => {
                // Instant scroll to the exact position - no animation
                window.scrollTo({
                  top: location.state.targetPosition,
                  behavior: "instant",
                });
              }, scrollDelay);
            } else {
              // Normal smooth scroll behavior with delay for page transition
              const scrollDelay = location.state.skipTransition
                ? 50
                : location.state.isBackNavigation
                  ? 350 // Faster for back navigation
                  : 400;
              setTimeout(() => {
                element.scrollIntoView({
                  behavior:
                    location.state.skipTransition ||
                    location.state.isBackNavigation
                      ? "instant"
                      : "smooth",
                  block: "start",
                });
              }, scrollDelay);
            }
          }
        },
        location.state.skipTransition || location.state.isBackNavigation
          ? 10
          : 100,
      );
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation />
        <main className="flex-grow">
          <div id="home-section">
            <HeroSection />
          </div>
          <div id="about-section">
            <AboutSection />
          </div>
          <ServicePage />
          <BlogPage />
          <div id="contact-section">
            <NewAboutPage />
          </div>
        </main>
        <footer className="py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NxtgenHub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
