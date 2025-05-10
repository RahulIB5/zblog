"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode values until mounted
  const isDarkMode = mounted ? theme === 'dark' : true;

  return (
    <section className={cn(
      "relative min-h-[600px] w-full overflow-hidden",
      isDarkMode 
        ? "bg-gradient-to-br from-black via-violet-950 to-indigo-950" 
        : "bg-gradient-to-br from-purple-500 via-indigo-200 to-purple-500"
    )}>
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:blur-3xl",
        isDarkMode
          ? "before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20"
          : "before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30"
      )} />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 py-24 md:flex-row md:py-32 md:px-8">
        {/* Content */}
        <div className="flex-1 space-y-8 text-center max-w-3xl mx-auto">
          <h1 className={cn(
            "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
            isDarkMode ? "text-white" : "text-gray-800"
          )}>
            The Light of Endless
            <span className={cn(
              "bg-clip-text text-transparent",
              isDarkMode
                ? "bg-gradient-to-r from-violet-400 to-indigo-400"
                : "bg-gradient-to-r from-indigo-600 to-violet-600"
            )}>
              {" "}
              Ideas
            </span>
          </h1>

          <p className={cn(
            "mx-auto max-w-2xl text-lg md:text-xl",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            From fleeting reflections to timeless stories — Aurora is where imagination flows freely. Explore, ponder, and get lost in words.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-center">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => router.push("/articles")}
            >
              Start Reading
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "rounded-full px-8 py-6 text-lg",
                isDarkMode ? "dark:text-white" : "text-gray-800"
              )}
              onClick={() => router.push("/dashboard/articles/create")}
            >
              Start Writing
            </Button>
          </div>

          {/* Stats */}
          <div className={cn(
            "grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto",
            isDarkMode ? "text-white" : "text-gray-800"
          )}>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">1K+</div>
              <div className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>Published Articles</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>Expert Writers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">10M+</div>
              <div className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>Monthly Readers</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex-1 md:mt-0">
          <div
            className={cn(
              "relative mx-auto h-64 w-64 rounded-2xl overflow-hidden",
              "border backdrop-blur-lg",
              "shadow-2xl",
              isDarkMode 
                ? "bg-gradient-to-br from-white/5 to-transparent border-primary/20 shadow-indigo-500/10" 
                : "bg-gradient-to-br from-white/80 to-white/60 border-indigo-200 shadow-indigo-300/20"
            )}
          >
            <Image
              src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Illustration for the blog"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;