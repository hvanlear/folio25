export * from "./project";
export * from "./post";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  isTransitioning: boolean;
}
