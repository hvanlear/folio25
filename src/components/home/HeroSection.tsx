import React, { useState, useEffect, useRef } from "react";
import AnimateInView from "../ui/AnimateInView";
import { inView } from "motion";

const HeroSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const rolesRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const socialContainerRef = useRef<HTMLDivElement>(null);

  // Hardcoded location
  const city = "RALEIGH";
  const region = "NORTH CAROLINA";

  // Format time in 12-hour format (HH:MM AM/PM)
  const formatTime = (date: Date): string => {
    return date
      .toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  };

  // Format date (MMM DD YYYY)
  const formatDate = (date: Date): string => {
    return date
      .toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .toUpperCase();
  };

  // Effect for updating time
  useEffect(() => {
    // Update time every minute
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Effect for matching container widths
  useEffect(() => {
    const matchContainerWidths = () => {
      if (nameContainerRef.current && socialContainerRef.current) {
        const nameWidth = nameContainerRef.current.offsetWidth;
        socialContainerRef.current.style.width = `${nameWidth}px`;
      }
    };

    // Run initially and on window resize
    matchContainerWidths();
    window.addEventListener("resize", matchContainerWidths);

    return () => {
      window.removeEventListener("resize", matchContainerWidths);
    };
  }, []);

  // Separate effect for handling animations - will run after component mount
  useEffect(() => {
    // Remove any existing animate classes (in case of refresh)
    const roleElements = document.querySelectorAll(".hero-role");
    roleElements.forEach((el) => el.classList.remove("animate"));

    // Setup the animation for hero-role elements with scroll observer
    if (rolesRef.current) {
      const cleanupInView = inView(
        rolesRef.current,
        (element) => {
          // Must have both parameters
          // Find all .hero-role elements
          const roleElements = element.querySelectorAll(".hero-role");

          // Add animate class with a delay for each role
          roleElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("animate");
            }, 300 + index * 200);
          });

          // Don't return a boolean, return void or a cleanup function
        },
        {
          amount: 0.2,
          // rootMargin is not supported in Motion's inView
        }
      );

      return () => {
        cleanupInView();
      };
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Welcome row - full width */}
        <div className="mb-6 md:mb-8">
          <AnimateInView animation="slide-up" delay={0.1}>
            <div className="font-serif">
              <div className="flex flex-row items-center gap-2 text-sm md:text-base lg:text-lg opacity-80">
                welcome, i&apos;m{" "}
                <div className="animate-bounce mt-4 md:block">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>

        {/* Name and Date row */}
        <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-16 mb-12 md:mb-16">
          <div
            id="hero-name-container"
            className="flex-1 mb-8 md:mb-0"
            ref={nameContainerRef}
          >
            <AnimateInView animation="slide-up" delay={0.2}>
              <h1 className="text-display-1 font-bold mb-8 md:mb-0">Hunter</h1>
            </AnimateInView>
          </div>
          <div
            id="hero-date-time-container"
            className="flex-1 mb-8 md:mb-0 md:flex md:flex-col md:justify-end"
          >
            <AnimateInView animation="slide-up" delay={0.3}>
              <div
                id="hero-date-time"
                className="flex flex-row gap-4 md:gap-6 text-xs opacity-80"
              >
                <div className="flex flex-col text-start">
                  <span>{city}</span>
                  <span>{region}</span>
                </div>
                <div className="flex flex-col text-start">
                  <span id="hero-date">{currentDate}</span>
                  <span id="hero-time">{currentTime}</span>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>

        {/* Bottom row - social links and roles */}
        <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-16">
          {/* Left column - social links */}
          <div
            id="hero-social-links-container"
            className="mb-8 md:mb-0"
            ref={socialContainerRef}
          >
            <AnimateInView animation="fade" delay={0.4}>
              <div>
                <ul className="flex flex-wrap gap-4 md:gap-6">
                  <li className="text-sm md:text-base">hvanlear@gmail.com</li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/huntervanlear/"
                      className="text-sm md:text-base hover:opacity-70 transition-opacity"
                    >
                      linkedin
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/huntervanlear/"
                      className="text-sm md:text-base hover:opacity-70 transition-opacity"
                    >
                      instagram
                    </a>
                  </li>
                </ul>
              </div>
            </AnimateInView>
          </div>

          {/* Right column - roles */}
          <div id="hero-roles-container" className="flex-1">
            <AnimateInView animation="slide-up" delay={0.6}>
              <div className="flex flex-col gap-4" ref={rolesRef}>
                <div className="flex flex-col gap-2">
                  <span className="hero-role text-sm md:text-base font-medium relative pb-1">
                    DESIGN
                  </span>
                  <span className="hero-role text-sm md:text-base font-medium relative pb-1">
                    DEVELOPE
                  </span>
                  <span className="hero-role text-sm md:text-base font-medium relative pb-1">
                    & IT
                  </span>
                </div>
                <span className="text-sm opacity-70 max-w-md">
                  Software engineer specializing in full-stack web development
                  with React, Next.js, and modern backend technologies.
                </span>
                <div className="animate-bounce mt-4 hidden md:block">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
