"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

export function BlogFooter() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription action (replace with actual API call if needed)
    setIsSubscribed(true);
  };

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Branding and Social Links */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                A
              </span>
              <span className="text-foreground">urora</span>
            </h2>
            <p className="text-muted-foreground">
              Wander through words, dive into diverse tales, and discover insights that spark inspiration. Here, no topic is too small and no idea too big.
              Stories, reflections, and ideas from all walks of life. Read, wonder, and wander.
            </p>
            <div className="flex gap-2">
              <a
                href="https://x.com/rahul_ib9880"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/RahulIB5"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-i-basaragi-05886829b"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/rahul__ib/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore and Legal Side by Side on Mobile */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
            {/* Explore */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
                    All Articles
                  </Link>
                </li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Topics</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Authors</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Podcasts</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            {isSubscribed ? (
            <Button  
              className="w-full"
              suppressHydrationWarning // Temporary workaround for fdprocessedid mismatch
            >
              Thanks for subscribing
            </Button>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="pl-10 pr-4 py-6"
                    suppressHydrationWarning // Temporary workaround for fdprocessedid mismatch
                  />
                  <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  suppressHydrationWarning // Temporary workaround for fdprocessedid mismatch
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aurora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}