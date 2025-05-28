// components/articles/article-search-input.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";

export default function ArticleSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchText, setSearchText] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(searchText, 1000);

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1"); // Reset to page 1 on new search
    } else {
      params.delete("search");
      params.set("page", "1");
    }
    router.push(`/articles?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto max-w-2xl"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-6 text-lg"
        />
      </div>
    </form>
  );
}