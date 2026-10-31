"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AdminTheme = "light" | "dark";

interface ThemeContextValue {
  theme: AdminTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("mysakinah_admin_theme");
    const initialTheme: AdminTheme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem("mysakinah_admin_theme", nextTheme);
      return nextTheme;
    });
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAdminTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAdminTheme must be used within AdminThemeProvider");
  }
  return context;
}
