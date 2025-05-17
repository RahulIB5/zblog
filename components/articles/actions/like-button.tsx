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
}) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes.length,
    (state, newValue: number) => newValue
  );
  
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    startTransition(async () => {
      // Optimistically update UI
      setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1);
      
      try {
        await toggleLike(articleId);
      } catch (error) {
        // Revert optimistic update if the action fails
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