"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        style={{ backgroundColor: isDark ? '#222222' : '#d1d5db' }}
        aria-pressed={isDark}
      >
        <span className="sr-only">Toggle theme</span>
        <div
          className="flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform"
          style={{
            transform: isDark ? 'translateX(20px)' : 'translateX(2px)'
          }}
        >
          {isDark ? (
            <Moon className="h-3 w-3 text-gray-800" />
          ) : (
            <Sun className="h-3 w-3 text-yellow-500" />
          )}
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle;
