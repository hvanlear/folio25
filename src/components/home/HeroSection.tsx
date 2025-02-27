import React, { useState, useEffect } from "react";

const HeroSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  
  // Hardcoded location
  const city = "RALEIGH";
  const region = "NORTH CAROLINA";

  // Format time in 12-hour format (HH:MM AM/PM)
  const formatTime = (date: Date): string => {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).toUpperCase();
  };

  // Format date (MMM DD YYYY)
  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).toUpperCase();
  };

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

  return (
    <section className="hero py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Hero top row - stack on mobile, flex on larger screens */}
        <div className="hero-row flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 mb-8">
          <div className="hero-name font-serif">
            <span className="hero-welcome block text-sm mb-1">
              welcome, i&apos;m
            </span>
            <h1 className="text-display-1 font-bold">Hunter</h1>
          </div>
          <div className="hero-location flex flex-row gap-4 md:gap-6 text-xs">
            <div className="hero-location-item flex flex-col text-start">
              <span>{city}</span>
              <span>{region}</span>
            </div>
            <div className="hero-location-item flex flex-col text-start">
              <span id="hero-date">{currentDate}</span>
              <span id="hero-time">{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Hero meta section - improve responsive layout */}
        <div className="hero-meta flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
          <div className="social-links w-full md:w-auto">
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
          <div className="hero-roles w-full md:max-w-xs lg:max-w-md flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="hero-role text-sm md:text-base font-medium">
                DESIGN
              </span>
              <span className="hero-role text-sm md:text-base font-medium">
                DEVELOPE
              </span>
              <span className="hero-role text-sm md:text-base font-medium">
                & IT
              </span>
            </div>
            <span className="hero-role-text text-sm opacity-70 max-w-md">
              Software engineer specializing in full-stack web development with
              React, Next.js, and modern backend technologies.
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
