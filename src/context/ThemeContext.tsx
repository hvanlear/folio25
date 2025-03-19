import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { ThemeContextType, Theme } from "../types";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Default theme matching the _document.js script's initial setting
const DEFAULT_THEME: Theme = "light";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use a simple initialization to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  // Initialize theme after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Start the transition coordination
    const startTransition = () => {
      // Add transitioning class to enable all transitions
      document.body.classList.add("theme-transitioning");
      
      // Apply theme class and data attribute
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      root.setAttribute("data-theme", theme);
      
      // Save theme preference to localStorage
      localStorage.setItem("theme", theme);
    };
    
    // Use requestAnimationFrame to ensure synchronized transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startTransition();
      });
    });
    
    // Remove the transitioning class after the transition completes
    const timer = setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 400); // Slightly longer than the CSS transition duration to ensure completion
    
    return () => clearTimeout(timer);
  }, [theme, mounted]);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => currentTheme === "light" ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
