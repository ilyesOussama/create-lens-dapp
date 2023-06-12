import {
  AnyPublication,
  ProfileId,
  usePublications,
} from "@lens-protocol/react-web";
import Publication from "./Publication";
import { useEffect, useState } from "react";

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
    <div className="mx-auto p-4 flex flex-col gap-4">
      {publications?.map(({ id }) => (
        <Publication publicationId={id} key={id} />
      ))}
    </div>
  );
};

export default Publications;
