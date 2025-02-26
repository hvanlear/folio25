import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/">
            My Portfolio
          </Link>
        </div>
        
        <nav className="nav">
          <ul>
            <li>
              <Link href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about">
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