import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
};

export default config;
