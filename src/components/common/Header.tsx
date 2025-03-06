import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import ColorBar from "../ui/ColorBar";

const Header: React.FC = () => {
  return (
    <header className="header sticky top-0 z-50 mix-blend-difference">
      <div className="container mx-auto px-4 flex justify-between items-center mix-blend-difference">
        <div className="mix-blend-difference z-50 w-20 ">
          <Logo />
          <ColorBar />
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
