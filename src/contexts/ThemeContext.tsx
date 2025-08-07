import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Create context with undefined default for safety
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  // Helper to write to document class and localStorage safely
  const applyTheme = (nextTheme: Theme) => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      localStorage.setItem("theme", nextTheme);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    let initialTheme: Theme = "light";
    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    } else if (prefersDark) {
      initialTheme = "dark";
    }
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    // eslint-disable-next-line
  }, []);

  // Set theme (and update dom/local) function
  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}