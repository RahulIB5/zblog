"use client";
import { FormEvent, startTransition, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "react-quill-new/dist/quill.snow.css";
import { createArticles } from "@/actions/create-article";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function CreateArticlePage() {
  const router = useRouter();
  const [content, setContent] = useState("");

  const [formState, action, isPending] = useActionState(createArticles, {
    errors: {},
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Navigate back to the dashboard or previous page
    // Option 1: Go to the dashboard articles page
    // router.push("/dashboard");
    
    // Option 2: Go back to the previous page in history
    router.back();
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br dark:from-black dark:via-violet-950 dark:to-indigo-950 from-purple-500 via-indigo-200 to-purple-500 overflow-x-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[300px] before:w-[300px] before:rounded-full before:blur-3xl dark:before:bg-gradient-to-r dark:before:from-violet-600/20 dark:before:to-indigo-600/20 before:bg-gradient-to-r before:from-indigo-300/30 before:to-violet-300/30" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Article</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter article title"
                />
                {formState.errors.title && (
                  <span className="font-medium text-sm text-red-500">
                    {formState.errors.title}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Enter category (e.g., Lifestyle, News)"
                />
                {formState.errors.category && (
                  <span className="font-medium text-sm text-red-500">
                    {formState.errors.category}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <Input
                  id="featuredImage"
                  name="featuredImage"
                  type="file"
                  accept="image/*"
                />
                {formState.errors.featuredImage && (
                  <span className="font-medium text-sm text-red-500">
                    {formState.errors.featuredImage}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
                {formState.errors.content && (
                  <span className="font-medium text-sm text-red-500">
                    {formState.errors.content[0]}
                  </span>
                )}
              </div>
              {formState.errors.formErrors && (
                <div className="dark:bg-transparent bg-red-100 p-2 border border-red-600">
                  <span className="font-medium text-sm text-red-500">
                    {formState.errors.formErrors}
                  </span>
                </div>
              )}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Loading..." : "Publish Article"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}