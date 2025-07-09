import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/home";
import BlogPostDetail from "./components/BlogPostDetail";
import ServiceDetail from "./components/ServiceDetail";
import TalkToExpertPage from "./components/TalkToExpertPage";
import GetStartedPage from "./components/GetStartedPage";
import SplashScreenPage from "./components/SplashScreenPage";
import routes from "tempo-routes";

// Forward navigation variants - slide in from right
const forwardNavigationVariants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 0.35,
    },
  },
  out: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "tween",
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 0.35,
    },
  },
};

// Back navigation variants - slide in from left with immediate opacity
const backNavigationVariants = {
  initial: {
    x: "-100%",
    opacity: 1, // Start with full opacity to prevent flash
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.35,
      },
      opacity: {
        duration: 0, // Instant opacity
      },
    },
  },
  out: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "tween",
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 0.35,
    },
  },
};

// No transition variants for instant navigation
const noTransitionVariants = {
  initial: {
    x: 0,
    opacity: 1,
  },
  in: {
    x: 0,
    opacity: 1,
  },
  out: {
    x: 0,
    opacity: 1,
  },
};

const instantTransition = {
  duration: 0,
};

function AnimatedRoutes() {
  const location = useLocation();

  // Check if this is initial page load (hard refresh or direct URL)
  const isInitialLoad = () => {
    return !location.state || window.performance.navigation.type === 1;
  };

  // Check if we should skip transitions (for instant navigation or initial load)
  const shouldSkipTransition = () => {
    return (
      location.state?.skipTransition === true ||
      (isInitialLoad() && location.pathname === "/")
    );
  };

  // Check if this is back navigation
  const isBackNavigation = () => {
    return location.state?.isBackNavigation === true;
  };

  // Check if this is forward navigation (going to detail pages or forms)
  const isForwardNavigation = () => {
    const path = location.pathname;
    return (
      (path.includes("/blog/") ||
        path.includes("/services/") ||
        path === "/talk-to-expert" ||
        path === "/get-started") &&
      !isBackNavigation()
    );
  };

  // Determine which variants to use (transitions are now handled within variants)
  const getVariantsAndTransition = () => {
    if (shouldSkipTransition()) {
      return {
        variants: noTransitionVariants,
        transition: instantTransition,
      };
    }

    if (isBackNavigation()) {
      return {
        variants: backNavigationVariants,
        transition: {}, // Transition handled in variants
      };
    }

    if (isForwardNavigation()) {
      return {
        variants: forwardNavigationVariants,
        transition: {}, // Transition handled in variants
      };
    }

    // Default to forward navigation for any other case
    return {
      variants: forwardNavigationVariants,
      transition: {}, // Transition handled in variants
    };
  };

  const { variants: currentVariants, transition: currentTransition } =
    getVariantsAndTransition();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + (shouldSkipTransition() ? "-instant" : "")}
        initial="initial"
        animate="in"
        exit="out"
        variants={currentVariants}
        transition={currentTransition}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/talk-to-expert" element={<TalkToExpertPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const hasShownSplash = sessionStorage.getItem("splashShown");

    if (!hasShownSplash) {
      setShowSplash(true);
      sessionStorage.setItem("splashShown", "true");
    } else {
      setSplashComplete(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSplashComplete(true);
  };

  if (showSplash) {
    return <SplashScreenPage onComplete={handleSplashComplete} />;
  }

  if (!splashComplete) {
    return null; // Prevent flash while determining splash state
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <AnimatedRoutes />
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
