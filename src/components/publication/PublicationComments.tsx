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
    <div>
      <h2>Comments</h2>
      {data &&
        data?.map(({ id, metadata }) => <div key={id}>{metadata.content}</div>)}
    </div>
  );
};

export default PublicationComments;
