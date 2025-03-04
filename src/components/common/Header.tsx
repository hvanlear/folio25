import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="header py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="mix-blend-difference z-50">
          <Logo />
        </div>

        {/* Navigation - hidden on mobile, visible on medium screens and up */}
        <nav className="nav hidden md:block">
          <ul className="">
            <li>
              <Link href="/">Home</Link>
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
