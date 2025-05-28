// app/articles/page.tsx
export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

import { Suspense } from "react";
import ArticleSearchInput from "@/components/articles/article-search-input";
import { AllArticlesPage, AllArticlesPageSkeleton } from "@/components/articles/all-articles-page";
import Navbar from "@/components/home/header/navbar";
import { BlogFooter } from "@/components/home/blog-footer";
import ThemeWrapper from "@/components/home/theme-wrapper";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";

const ITEMS_PER_PAGE = 3;

export default async function Page({ searchParams }: { searchParams: { search?: string; page?: string } }) {
  const resolvedParams = await Promise.resolve(searchParams);
  const searchText = resolvedParams?.search || "";
  const currentPage = Number(resolvedParams?.page) || 1;

  // Fetch initial data for server-side rendering
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;
  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);

  return (
    <ThemeWrapper>
      <div className="flex flex-col min-h-screen w-full">
        {/* Navbar - Static */}
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
                  {/* Search Bar - Static but client-side interactive */}
                  <Suspense fallback={<div>Loading search...</div>}>
                    <ArticleSearchInput />
                  </Suspense>
                </div>
                {/* Articles List - Client-side component */}
                <Suspense
                  key={`${searchText}-${currentPage}`}
                  fallback={<AllArticlesPageSkeleton />}
                >
                  <AllArticlesPage
                    initialArticles={articles}
                    initialTotal={total}
                    searchText={searchText}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                  />
                </Suspense>
              </div>
            </section>
          </div>
        </main>

        {/* Footer - Static */}
        <BlogFooter />
      </div>
    </ThemeWrapper>
  );
}