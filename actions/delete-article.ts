"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to delete an article.");
  }

  // Find the existing article
  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    throw new Error("Article not found.");
  }

  // Check if the user is the author
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user || existingArticle.authorId !== user.id) {
    throw new Error("You are not authorized to delete this article.");
  }

  // Delete the article
  await prisma.articles.delete({
    where: {
      id: articleId,
    },
  });

  revalidatePath("/dashboard");
};