import {
  AnyPublication,
  ProfileId,
  usePublications,
  PaginatedReadResult,
} from "@lens-protocol/react-web";
import { Publication } from "./Publication";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Repeat } from "lucide-react";

const Publications = ({
  profileId,
  limit = 10,
}: {
  profileId: ProfileId;
  limit?: number;
}) => {
  const [publications, setPublications] = useState<
    AnyPublication[] | undefined
  >([]);

  const { data, error, loading } = usePublications({
    profileId,
    limit,
  });

  useEffect(() => {
    const publications = data?.filter((publication) => {
      if (publication.__typename !== "Comment") {
        return true;
      }
    });
    setPublications(publications);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="mx-auto flex flex-col gap-4 border border-1 border-gray-200 dark:border-gray-700 rounded-sm">
      {publications?.map((publication, index) => {
        if (publication.__typename === "Mirror") {
          return (
            <div
              key={publication.id}
              className={cn(
                index !== data.length - 1 &&
                  "border-b border-gray-200 dark:border-gray-700",
                "py-2"
              )}
            >
              <div className="flex flex-row gap-2 px-4">
                <Repeat /> {publication.profile.name} mirrored
              </div>
              <Publication publicationId={publication.mirrorOf.id} />
            </div>
          );
        }
        return (
          <div
            key={publication.id}
            className={cn(
              index !== data.length - 1 &&
                "border-b border-gray-200 dark:border-gray-700",
              "py-2"
            )}
          >
            <Publication publicationId={publication.id} />
          </div>
        );
      })}
    </div>
  );
};

export { Publications };
