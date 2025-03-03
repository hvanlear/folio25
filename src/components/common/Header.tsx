import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="header py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo">
          <Link href="/" className="text-xl font-bold">
            My Portfolio
          </Link>
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
