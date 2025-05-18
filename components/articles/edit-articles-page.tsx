"use client";
import { FormEvent, startTransition, useActionState, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Articles } from "@/lib/prisma";
import { updateArticles } from "@/actions/update-article";
import Image from "next/image";
import { useRouter } from "next/navigation";

type EditPropsPage = {
  article: Articles;
};

const EditArticlePage: React.FC<EditPropsPage> = ({ article }) => {
  const router = useRouter();
  const [content, setContent] = useState(article.content);
  const [formState, action, isPending] = useActionState(
    updateArticles.bind(null, article.id),
    { errors: {} }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  // Handle discard changes
  const handleDiscardChanges = () => {
    // Navigate back to the dashboard articles page
    // router.push("/dashboard");
    
    // Alternative: Go back to the previous page in history
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
            <CardTitle className="text-2xl">Edit Article</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={article.title}
                  placeholder="Enter article title"
                  required
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
                  defaultValue={article.category}
                  placeholder="Enter category (e.g., Lifestyle, News)"
                  required
                />
                {formState.errors.category && (
                  <span className="font-medium text-sm text-red-500">
                    {formState.errors.category}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                {article.featuredImage && (
                  <div className="mb-4">
                    <Image
                      src={article.featuredImage}
                      alt="Current featured"
                      width={192}
                      height={128}
                      className="object-cover rounded-md"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Current featured image
                    </p>
                  </div>
                )}
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

              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleDiscardChanges}
                >
                  Discard Changes
                </Button>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Loading..." : "Update Article"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditArticlePage;