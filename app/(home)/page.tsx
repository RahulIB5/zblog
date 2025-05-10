import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import HeroSection from "@/components/home/hero-section";
import { TopArticles } from "@/components/home/top-articles";
import { BlogFooter } from "@/components/home/blog-footer";
import { AllArticlesPageSkeleton } from "../articles/page";
import ThemeWrapper from "@/components/home/theme-wrapper"; // Adjust the import path as needed

const Page = async () => {
  return (
    <ThemeWrapper>
      <main>
        <HeroSection />
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Articles
              </h2>
              <p className="mt-4 text-lg opacity-80">
                Discover our most popular and trending content
              </p>
            </div>

            {/* Top Articles */}
            <Suspense fallback={<AllArticlesPageSkeleton />}>
              <TopArticles/>
            </Suspense>

            <div className="mt-12 text-center">
              <Link href={"/articles"}>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
                >
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <BlogFooter />
      </main>
    </ThemeWrapper>
  );
};

export default Page;