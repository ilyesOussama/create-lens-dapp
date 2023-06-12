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
    <ul className="flex flex-col gap-2 rounded-sm border border-gray-200 dark:border-gray-700 p-4">
      {data &&
        data?.map(({ id, metadata }) => (
          <li key={id}>
            <p className="py-2">{metadata.content}</p>
            <hr />
          </li>
        ))}
    </ul>
  );
};

export default PublicationComments;
