import { convertIpfsUrl } from "@/lib/convertIpfsUrl";
import { ProfileId, usePublications } from "@lens-protocol/react-web";
import Image from "next/image";
import Publication from "./Publication";

const Publications = ({ profileId }: { profileId: ProfileId }) => {
  const { data, error, loading } = usePublications({
    profileId,
  });

  if (error) {
    <div>Error</div>;
  }

  if (loading) {
    <div>Loading</div>;
  }

  return (
    <div className="mx-auto p-4 flex flex-col gap-4">
      {data?.map(({ id }) => (
        <Publication publicationId={id} key={id} />
      ))}
    </div>
  );
};

export default Publications;
