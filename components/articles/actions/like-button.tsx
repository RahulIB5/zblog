"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/actions/like-toggle";
import { Like } from "@/lib/prisma";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
  userId?: string; // Added for better type safety with user context
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
  userId,
}) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes.length,
    (state, newValue: number) => newValue
  );
  
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    if (!userId) {
      // Redirect to Clerk sign-in and return to current page after login
      window.location.href = `https://fit-lioness-37.accounts.dev/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`;
      return;
    }
  
    startTransition(async () => {
      setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1);
      try {
        await toggleLike(articleId);
      } catch (error) {
        setOptimisticLikes(isLiked ? optimisticLikes + 1 : optimisticLikes - 1);
        console.error("Failed to toggle like:", error);
      }
    });
  };

  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <Button
        type="button"
        variant="ghost"
        className="gap-2"
        onClick={handleLike}
        disabled={isPending}
        aria-label={isLiked ? "Unlike article" : "Like article"}
        aria-pressed={isLiked}
      >
        <ThumbsUp className={`h-5 w-5 ${isLiked ? "text-blue-500 fill-blue-500" : ""}`} />
        {optimisticLikes}
      </Button>
      
      <Button 
        variant="ghost" 
        className="gap-2"
        aria-label="Save article"
      >
        <Bookmark className="h-5 w-5" /> 
        Save
      </Button>
      
      <Button 
        variant="ghost" 
        className="gap-2"
        aria-label="Share article"
      >
        <Share2 className="h-5 w-5" /> 
        Share
      </Button>
    </div>
  );
};

export default LikeButton;