import { useContext } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeProvider);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}