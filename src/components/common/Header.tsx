import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import ColorBar from "../ui/ColorBar";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      // Only hide header after scrolling down a bit (e.g., 100px)
      // and show it immediately when scrolling up
      if (isScrollingDown && currentScrollPos > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`header sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="mix-blend-difference z-50 w-20">
          <Logo />
          <ColorBar />
        </div>

        {/* Navigation - hidden on mobile, visible on medium screens and up */}
        <nav className="nav hidden md:block">
          <ul className="">
            <li>
              <Link
                href="/"
                className="text-text hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/design-system">Design System</Link>
            </li>
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
