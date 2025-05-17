import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import prisma from "@/lib/prisma";
import LikeButton from "./actions/like-button";
import { auth } from "@clerk/nextjs/server";
import type { Comment, Articles, Like, User } from "@/lib/prisma";

type CommentWithAuthor = Comment & {
  author: Pick<User, 'name' | 'email' | 'imageUrl'>;
};

type ArticleWithAuthor = Articles & {
  author: Pick<User, 'name' | 'email' | 'imageUrl'>;
};

type UserForLike = Pick<User, 'id' | 'clerkUserId' | 'name' | 'email' | 'imageUrl' | 'role'>;

type ArticleDetailPageProps = {
  article: ArticleWithAuthor;
};

export async function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  try {
    // Parallel data fetching
    const [comments, likes, { userId }] = await Promise.all([
      prisma.comment.findMany({
        where: { articleId: article.id },
        include: {
          author: {
            select: { name: true, email: true, imageUrl: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }) as Promise<CommentWithAuthor[]>,
      
      prisma.like.findMany({
        where: { articleId: article.id }
      }) as Promise<Like[]>,
      
      auth()
    ]);

    let user: UserForLike | null = null;
    let isLiked = false;

    if (userId) {
      user = await prisma.user.findUnique({ 
        where: { clerkUserId: userId },
        select: {
          id: true,
          clerkUserId: true,
          name: true,
          email: true,
          imageUrl: true,
          role: true
        }
      });
      isLiked = user ? likes.some(like => like.userId === user?.id) : false;
    }

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500">
        <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:blur-3xl dark:before:bg-gradient-to-r dark:before:from-violet-600/20 dark:before:to-indigo-600/20 before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30" />

        <main className="container relative mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-3xl">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {article.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={article.author.imageUrl ?? undefined} />
                  <AvatarFallback>
                    {article.author.name?.charAt(0)?.toUpperCase() ?? 'A'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {article.author.name}
                  </p>
                  <p className="text-sm">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} · 12 min read
                  </p>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <section
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Actions */}
            <LikeButton 
              articleId={article.id} 
              likes={likes} 
              isLiked={isLiked} 
              userId={user?.id}
            />

            {/* Comments Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                </h2>
              </div>

              <CommentForm articleId={article.id} />

              <CommentList comments={comments} />
            </Card>
          </article>
        </main>
      </div>
    );

  } catch (error) {
    console.error("Failed to fetch article details:", error);
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Failed to load article
          </h1>
          <p className="text-muted-foreground">
            We couldn't load this article. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}