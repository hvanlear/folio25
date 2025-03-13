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
    <section className="min-h-screen flex items-center bg-background">
      <div className="container mx-auto px-4">
        {/* Welcome row - full width */}
        <div className="ml-4">
          <AnimateInView animation="slide-up" delay={0.1}>
            <div className="font-serif">
              <div className="flex flex-row items-center gap-2 text-sm md:text-base lg:text-xl opacity-80">
                welcome, i&apos;m{" "}
                <div className=" mt-4 md:block">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1464 14.2832C10.3417 14.4785 10.6583 14.4785 10.8536 14.2832L14.8536 10.2832C15.0488 10.088 15.0488 9.7714 14.8536 9.57613C14.6583 9.38087 14.3417 9.38087 14.1464 9.57613L11 12.7226V2.92969C11 1.54898 9.88071 0.429688 8.5 0.429688H0.5C0.223858 0.429688 0 0.653545 0 0.929688C0 1.20583 0.223858 1.42969 0.5 1.42969H8.5C9.32843 1.42969 10 2.10126 10 2.92969V12.7226L6.85355 9.57613C6.65829 9.38087 6.34171 9.38087 6.14645 9.57613C5.95118 9.7714 5.95118 10.088 6.14645 10.2832L10.1464 14.2832Z"
                      fill="currentColor"
                    />
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
            className="flex-1 mb-8 md:mb-0 md:flex md:flex-col justify-center mt-8"
          >
            <AnimateInView animation="slide-up" delay={0.3}>
              <div
                id="hero-date-time"
                className="flex flex-row gap-4 md:gap-6 text-xs opacity-80 justify-end mt-4"
              >
                <div className="flex flex-col text-start">
                  <span className="text-xs uppercase tracking-wider">
                    {city}
                  </span>
                  <span className="text-xs uppercase tracking-wider">
                    {region}
                  </span>
                </div>
                <div className="flex flex-col text-start">
                  <span
                    className="text-xs uppercase tracking-wider"
                    id="hero-date"
                  >
                    {currentDate}
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider"
                    id="hero-time"
                  >
                    {currentTime}
                  </span>
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
            className="mb-8 md:mb-0 content-center"
            ref={socialContainerRef}
          >
            <AnimateInView animation="fade" delay={0.4}>
              <div className="ml-4">
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
                <div className="flex flex-col gap-4">
                  <span className="hero-role text-sm md:text-base font-medium relative pb-1">
                    Designer
                  </span>
                  <span className="hero-role text-sm md:text-base font-medium relative pb-1">
                    Developer
                  </span>
                  <span className="hero-role text-sm md:text-base font-medium relative pb-1">
                    & Problem Solver
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
