import { FileText, MessageCircle, PlusCircle, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RecentArticles from "./recent-articles";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function BlogDashboard() {
  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Find the user
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return <div>User not found.</div>;
  }

  // Fetch user's articles, their comments, and likes
  const [articles, totalComments, totalLikes] = await Promise.all([
    prisma.articles.findMany({
      where: {
        authorId: user.id, // Only user's articles
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
        likes: true, // Assuming a likes relation exists
      },
    }),
    prisma.comment.count({
      where: {
        article: {
          authorId: user.id, // Comments on user's articles
        },
      },
    }),
    prisma.like.count({
      where: {
        article: {
          authorId: user.id, // Likes on user's articles
        },
      },
    }),
  ]);

  return (
    <main className="relative flex-1 p-6 md:pl-8 max-w-full min-w-0 box-border overflow-hidden bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500">
      {/* Gradient overlay */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:blur-3xl dark:before:bg-gradient-to-r dark:before:from-violet-600/20 dark:before:to-indigo-600/20 before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8 max-w-full">
          <div className="max-w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground break-words">
              Your Blog Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground break-words">
              Manage your content and analytics
            </p>
          </div>
          <Link href={"/dashboard/articles/create"} className="w-full sm:w-auto">
            <Button className="gap-2 w-full sm:w-auto whitespace-nowrap">
              <PlusCircle className="h-4 w-4 flex-shrink-0" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8 max-w-full">
          <Card className="w-full max-w-full min-w-0 box-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium break-words">
                Total Articles
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold break-words">{articles.length}</div>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                Your published articles
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-full min-w-0 box-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium break-words">
                Total Comments
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold break-words">{totalComments}</div>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                On your articles
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-full min-w-0 box-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium break-words">
                Total Likes
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold break-words">{totalLikes}</div>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                On your articles
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-full min-w-0 box-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium break-words">
                Avg. Reading Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold break-words">4.2m</div>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                Based on your articles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Articles */}
        <div className="w-full max-w-full min-w-0 box-border overflow-hidden">
          <div className="md:hidden">
            <h2 className="text-xl font-semibold mb-4 break-words">Your Recent Articles</h2>
            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <div
                  key={article.id}
                  className="border rounded-lg p-3 w-full max-w-full min-w-0 box-border overflow-hidden"
                >
                  <h3 className="font-medium line-clamp-1 text-ellipsis overflow-hidden break-words">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground break-words">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block w-full max-w-full">
            <RecentArticles articles={articles} />
          </div>
        </div>
      </div>
    </main>
  );
}