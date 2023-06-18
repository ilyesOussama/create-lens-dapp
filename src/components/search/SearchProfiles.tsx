import { cn, debounce } from "@/lib/utils";
import { Profile, useSearchProfiles } from "@lens-protocol/react-web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../LoadingSpinner";

const SearchProfiles = ({ query }: { query: string }) => {
  const {
    data: profiles,
    error,
    loading,
    next,
    hasMore,
  } = useSearchProfiles({
    query,
  });

  const loadMorePublications = () => {
    next();
  };

  if (error) return <div className="container mx-auto">Error</div>;
  if (loading)
    return (
      <div className="container mx-auto">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-col border border-1 border-gray-200 dark:border-gray-700">
        {profiles?.map(({ id, handle }, index) => (
          <Link
            href={`/profile/${id}`}
            key={id}
            className={cn(
              index !== profiles.length - 1 ? "border-b" : "border-b-0",
              "border-gray-200 dark:border-gray-700 p-2"
            )}
          >
            {handle}
          </Link>
        ))}
      </div>
      {hasMore && (
        <Button onClick={loadMorePublications} variant="outline">
          Load More
        </Button>
      )}
    </div>
  );
};

export { SearchProfiles };
