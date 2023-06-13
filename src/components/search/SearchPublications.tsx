import { cn, debounce } from "@/lib/utils";
import {
  ContentPublication,
  useSearchProfiles,
  useSearchPublications,
} from "@lens-protocol/react-web";
import Link from "next/link";

const SearchPublications = ({ query }: { query: string }) => {
  const {
    data: publications,
    error,
    loading,
  } = useSearchPublications({
    query,
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  return (
    <div className="flex flex-col border border-1 border-gray-200 dark:border-gray-700">
      {publications?.map(({ id, metadata }, index) => (
        <Link
          href={`/publication/${id}`}
          key={id}
          className={cn(
            index !== publications.length - 1 ? "border-b" : "border-b-0",
            "border-gray-200 dark:border-gray-700 p-2"
          )}
        >
          {metadata.content}
        </Link>
      ))}
    </div>
  );
};

export { SearchPublications };
