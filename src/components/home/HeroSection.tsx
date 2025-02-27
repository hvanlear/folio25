import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-row flex flex-row justify-between items-center">
          <div className="hero-name font-serif ">
            <span className="hero-welcome">welcome, i&apos;m</span>
            <h1 className="text-display-1">Hunter</h1>
          </div>
          <div className="hero-location flex flex-row gap-6 text-body-xs">
            <div className="hero-location-item flex flex-col text-start">
              <span>RALEIGH</span>
              <span>NORTH CAROLINA</span>
            </div>
            <div className="hero-location-item flex flex-col text-start">
              <span>DEC 25 2025</span>
              <span>12:46 AM</span>
            </div>
          </div>
        </div>

        <div className="hero-meta">
          <div className="social-links">
            <ul className="flex flex-row gap-6">
              <li className="text">hvanlear@gmail.com</li>
              <li>
                <a href="https://www.linkedin.com/in/huntervanlear/">
                  linkedin
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/huntervanlear/">
                  instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="hero-roles max-w-40 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="hero-role">DESIGN</span>
              <span className="hero-role">DEVELOPE</span>
              <span className="hero-role">& IT</span>
            </div>
            <span className="hero-role-text text-sm opacity-70">
              Software engineer specializing in full-stack web development
              with React, Next.js, and modern backend technologies.
            </span>
            <div className="animate-bounce mt-4">
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