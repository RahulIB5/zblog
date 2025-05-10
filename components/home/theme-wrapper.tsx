"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode values until mounted
  const isDarkMode = mounted ? theme === 'dark' : true;

  return (
    <div className={
      isDarkMode 
        ? "bg-gradient-to-br from-indigo-950 via-violet-950 to-black" 
        : "bg-gradient-to-br from-indigo-200 via-indigo-400 to-purple-500"
    }>
      {children}
    </div>
  );
}