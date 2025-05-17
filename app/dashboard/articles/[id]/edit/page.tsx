import EditArticlePage from '@/components/articles/edit-articles-page'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => { 
  const id = (await params).id;
  let article = null;

  try {
    article = await prisma.articles.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500 overflow-x-hidden">
        <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[300px] before:w-[300px] before:rounded-full before:blur-3xl dark:before:bg-gradient-to-r dark:before:from-violet-600/20 dark:before:to-indigo-600/20 before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30" />
        <div className="relative container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground text-center">
            Failed to load article. Please try again later.
          </h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500 overflow-x-hidden">
        <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[300px] before:w-[300px] before:rounded-full before:blur-3xl dark:before:bg-gradient-to-r dark:before:from-violet-600/20 dark:before:to-indigo-600/20 before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30" />
        <div className="relative container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground text-center">
            Article not found.
          </h1>
        </div>
      </div>
    );
  }

  return <EditArticlePage article={article} />;
}

export default page