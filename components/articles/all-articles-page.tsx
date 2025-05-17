import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; 
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Articles, User } from "@/lib/prisma";

type ArticleWithAuthor = Articles & {
  author: Pick<User, 'name' | 'email' | 'imageUrl'>;
};

type SearchPageProps = {
  articles: ArticleWithAuthor[];
};

export function AllArticlesPage({ articles }: SearchPageProps) {
  return (
    <div className="px-4 py-8 max-w-screen-2xl mx-auto">
      {articles.length === 0 ? (
        <NoSearchResults />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

type ArticleCardProps = {
  article: ArticleWithAuthor;
};

const ArticleCard = ({ article }: ArticleCardProps) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
    <div className="p-6 flex-1">
      <Link href={`/articles/${article.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
          <Image
            src={article.featuredImage || '/placeholder-article.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Article Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {article.category}
          </p>
        </div>

        {/* Author & Metadata */}
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
              day: 'numeric'
            })}
          </div>
        </div>
      </Link>
    </div>
  </Card>
);

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>
      <p className="mt-2 text-muted-foreground max-w-md">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}