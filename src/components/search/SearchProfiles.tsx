import { cn, debounce } from "@/lib/utils";
import { useSearchProfiles } from "@lens-protocol/react-web";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchProfiles = ({ query }: { query: string }) => {
  const {
    data: profiles,
    error,
    loading,
  } = useSearchProfiles({
    query,
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  return (
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
  );
};

export { SearchProfiles };
