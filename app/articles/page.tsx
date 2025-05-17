export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleSearchInput from "@/components/articles/article-search-input";
import { AllArticlesPage } from "@/components/articles/all-articles-page";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import Navbar from "@/components/home/header/navbar";
import { BlogFooter } from "@/components/home/blog-footer";
import ThemeWrapper from "@/components/home/theme-wrapper";

const ITEMS_PER_PAGE = 3;

// Async component for fetching and rendering articles
async function ArticlesList({ searchText, currentPage }: { searchText: string; currentPage: number }) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      <AllArticlesPage articles={articles} />
      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        {/* Prev Button */}
        <Link
          href={`/articles?search=${encodeURIComponent(searchText)}&page=${currentPage - 1}`}
          passHref
        >
          <Button variant="ghost" size="sm" disabled={currentPage === 1}>
            ← Prev
          </Button>
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <Link
            key={index}
            href={`/articles?search=${encodeURIComponent(searchText)}&page=${index + 1}`}
            passHref
          >
            <Button
              variant={currentPage === index + 1 ? "destructive" : "ghost"}
              size="sm"
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </Button>
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={`/articles?search=${encodeURIComponent(searchText)}&page=${currentPage + 1}`}
          passHref
        >
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next →
          </Button>
        </Link>
      </div>
    </>
  );
}

// Skeleton component for loading state
export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />
            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />
            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />
                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Main page component
export default async function Page({ searchParams }: { searchParams: { search?: string; page?: string } }) {
  const resolvedParams = await Promise.resolve(searchParams);
  const searchText = resolvedParams?.search || "";
  const currentPage = Number(resolvedParams?.page) || 1;

  return (
    <ThemeWrapper>
      <div className="flex flex-col min-h-screen w-full">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <div className="relative bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500">
            {/* Gradient overlay */}
            <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[300px] before:w-[300px] before:rounded-full before:blur-3xl dark:before:bg-gradient-to-r dark:before:from-violet-600/20 dark:before:to-indigo-600/20 before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30 before:z-[-1]" />

            {/* Content */}
            <section className="relative py-16 md:py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-12 space-y-6 text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    All Articles
                  </h1>
                  {/* Search Bar */}
                  <Suspense fallback={<div>Loading search...</div>}>
                    <ArticleSearchInput />
                  </Suspense>
                </div>
                {/* Articles List with Suspense */}
                <Suspense
                  key={`${searchText}-${currentPage}`}
                  fallback={<AllArticlesPageSkeleton />}
                >
                  <ArticlesList searchText={searchText} currentPage={currentPage} />
                </Suspense>
              </div>
            </section>
          </div>
        </main>
        <BlogFooter />
      </div>
    </ThemeWrapper>
  );
}