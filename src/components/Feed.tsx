// @ts-nocheck
import { PublisherContext } from "@/context/ProfileContext";
import {
  useFeed,
  ProfileId,
  AnyPublication,
  FeedItem,
} from "@lens-protocol/react-web";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Repeat } from "lucide-react";
import { Publication } from "./publication";
import { LoadingSpinner } from "./LoadingSpinner";

const Feed = ({ limit = 10 }: { limit?: number }) => {
  const [feedItems, setFeedItems] = useState<FeedItem[] | undefined>([]);
  const [hasMorePublications, setHasMorePublications] = useState(false);

  const { profileOwnedByMe } = useContext(PublisherContext);

  const { data, loading, error, hasMore, next } = useFeed({
    profileId: profileOwnedByMe?.id as ProfileId,
    limit,
  });

  useEffect(() => {
    setFeedItems(data);
    setHasMorePublications(hasMore);
  }, [data, hasMore]);

  const loadMoreFeedItems = () => {
    next();
  };

  if (loading)
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto flex flex-col gap-4 border border-1 border-gray-200 dark:border-gray-700 rounded-sm">
        {feedItems?.map(({ root }, index) => {
          return (
            <Link
              href={`/publication/${root.id}`}
              key={root.id}
              className={cn(
                index !== data.length - 1 &&
                  "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 duration-500",
                "py-2"
              )}
            >
              {root.__typename === "Mirror" ? (
                <div>
                  <div className="flex flex-row gap-2 px-4">
                    <Repeat />{" "}
                    <Link href={`/profile/${root.profile.id}`}>
                      {root.profile.name}
                    </Link>
                    mirrored
                  </div>
                  <Publication publicationId={root.mirrorOf.id} />
                </div>
              ) : (
                <Publication publicationId={root.id} />
              )}
            </Link>
          );
        })}
      </div>
      {hasMore && (
        <Button onClick={loadMoreFeedItems} variant="outline">
          Load More
        </Button>
      )}
    </div>
  );
};

export { Feed };
