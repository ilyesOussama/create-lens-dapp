import { cn } from "@/lib/utils";
import { PublicationId, useComments } from "@lens-protocol/react-web";
import React from "react";

const PublicationComments = ({
  publicationId,
}: {
  publicationId: PublicationId;
}) => {
  const { data, error, loading } = useComments({
    commentsOf: publicationId,
  });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {data && (
        <ul className="flex flex-col gap-2 rounded-sm border border-gray-200 dark:border-gray-700 p-4">
          <h2>Comments</h2>
          {data.map(({ id, metadata }, index) => (
            <li
              key={id}
              className={cn(
                index !== data.length - 1 &&
                  "border-b border-gray-200 dark:border-gray-700",
                "py-2"
              )}
            >
              <p>{metadata.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { PublicationComments };
