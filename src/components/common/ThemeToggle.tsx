import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'motion/react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Use client-side only rendering to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // After mounted on client, we can show the UI that depends on theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering anything before mounting to prevent hydration errors
  if (!mounted) {
    return <button className="theme-toggle invisible" aria-hidden="true"></button>;
  }

  const isDark = theme === 'dark';
  
  return (
    <motion.button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? '☀️' : '🌙'}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle; 