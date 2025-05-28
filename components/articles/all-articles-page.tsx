// components/articles/all-articles-page.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Articles, User } from "@/lib/prisma";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";

type ArticleWithAuthor = Articles & {
  author: Pick<User, "name" | "email" | "imageUrl">;
};

type SearchPageProps = {
  initialArticles: ArticleWithAuthor[];
  initialTotal: number;
  searchText: string;
  currentPage: number;
  itemsPerPage: number;
};

export function AllArticlesPage({
  initialArticles,
  initialTotal,
  searchText,
  currentPage,
  itemsPerPage,
}: SearchPageProps) {
  const [articles, setArticles] = useState<ArticleWithAuthor[]>(initialArticles);
  const [total, setTotal] = useState(initialTotal);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / itemsPerPage);

  // Fetch articles when search or page changes
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentPageParam = Number(searchParams.get("page")) || 1;

    // Skip fetch if params match initial props (server-rendered data)
    if (
      currentSearch === searchText &&
      currentPageParam === currentPage &&
      articles.length > 0
    ) {
      return;
    }

    async function fetchArticles() {
      try {
        const skip = (currentPageParam - 1) * itemsPerPage;
        const take = itemsPerPage;
        const { articles: newArticles, total: newTotal } = await fetchArticleByQuery(
          currentSearch,
          skip,
          take
        );
        setArticles(newArticles);
        setTotal(newTotal);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
        setTotal(0);
      }
    }

    startTransition(() => {
      fetchArticles();
    });
  }, [searchParams, searchText, currentPage, itemsPerPage, articles.length]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/articles?${params.toString()}`);
  };

  return (
    <div className="px-4 py-8 max-w-screen-2xl mx-auto">
      {isPending ? (
        <AllArticlesPageSkeleton />
      ) : articles.length === 0 ? (
        <NoSearchResults />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
      <div className="mt-12 flex justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
        >
          ← Prev
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "destructive" : "ghost"}
            size="sm"
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1 || isPending}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0 || isPending}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

type ArticleCardProps = {
  article: ArticleWithAuthor;
};

const ArticleCard = ({ article }: ArticleCardProps) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
    <div className="p-6 flex-1">
      <a href={`/articles/${article.id}`} className="flex flex-col h-full">
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
          <Image
            src={article.featuredImage || '/placeholder-article.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-muted-foreground">{article.category}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={article.author.imageUrl || undefined} />
              <AvatarFallback>
                {article.author.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground line-clamp-1">
              {article.author.name}
            </span>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </a>
    </div>
  </Card>
);

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No Results Found</h3>
      <p className="mt-2 text-muted-foreground max-w-md">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}