import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

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
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:opacity-70 transition-opacity">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:opacity-70 transition-opacity">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:opacity-70 transition-opacity">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:opacity-70 transition-opacity">
                About
              </Link>
            </li>
          </ul>
        </nav>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header; 