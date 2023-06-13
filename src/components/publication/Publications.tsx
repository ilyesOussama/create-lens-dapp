import {
  AnyPublication,
  ProfileId,
  usePublications,
} from "@lens-protocol/react-web";
import { Publication } from "./Publication";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Publications = ({ profileId }: { profileId: ProfileId }) => {
  const [publications, setPublications] = useState<
    AnyPublication[] | undefined
  >([]);

  const { data, error, loading } = usePublications({
    profileId,
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
      {publications?.map(({ id }, index) => (
        <div
          key={id}
          className={cn(
            index !== data.length - 1 &&
              "border-b border-gray-200 dark:border-gray-700",
            "py-2"
          )}
        >
          <Publication publicationId={id} />
        </div>
      ))}
    </div>
  );
};

export { Publications };
