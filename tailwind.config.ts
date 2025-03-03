import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      // Font families
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },

      // Custom fluid typography sizes using clamp
      fontSize: {
        // Display text sizes
        "display-1": [
          "clamp(5rem, 15vw, 30rem)",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        "display-2": [
          "clamp(3rem, 6vw, 5rem)",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],

        // Heading text sizes
        h1: [
          "clamp(2.25rem, 5vw, 3.25rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        h2: [
          "clamp(1.75rem, 4vw, 2.5rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        h3: [
          "clamp(1.5rem, 3vw, 1.75rem)",
          {
            lineHeight: "1.3",
            fontWeight: "600",
          },
        ],
        h4: [
          "clamp(1.25rem, 2vw, 1.5rem)",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        h5: [
          "clamp(1.125rem, 1.5vw, 1.25rem)",
          {
            lineHeight: "1.5",
            fontWeight: "600",
          },
        ],

        // Body text sizes
        "body-xl": [
          "clamp(1.125rem, 1.2vw, 1.375rem)",
          {
            lineHeight: "1.6",
          },
        ],
        "body-lg": [
          "clamp(1.0625rem, 1.1vw, 1.25rem)",
          {
            lineHeight: "1.6",
          },
        ],
        body: [
          "clamp(1rem, 1vw, 1.125rem)",
          {
            lineHeight: "1.6",
          },
        ],
        "body-sm": [
          "clamp(0.875rem, 0.9vw, 1rem)",
          {
            lineHeight: "1.5",
          },
        ],
        "body-xs": [
          "clamp(0.75rem, 0.8vw, 0.875rem)",
          {
            lineHeight: "1.5",
          },
        ],
      },

      // Font weights
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      // Line heights
      lineHeight: {
        tight: "1.1",
        snug: "1.2",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },

      // Letter spacing
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.05em",
      },

      // Colors
      colors: {
        background: "var(--background-color)",
        border: "var(--border-color)",
        primary: {
          DEFAULT: "var(--primary-color)",
          light: "var(--primary-color-light)",
          dark: "var(--primary-color-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary-color)",
          light: "var(--secondary-color-light)",
          dark: "var(--secondary-color-dark)",
        },
        card: {
          DEFAULT: "var(--card-background)",
        },
        text: "var(--text-color)",
      },
      // Shadows
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      // Spacing
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
      },
    },
  },
};

export default config;
