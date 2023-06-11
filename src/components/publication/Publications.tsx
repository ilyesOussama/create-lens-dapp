import { convertIpfsUrl } from "@/lib/convertIpfsUrl";
import { ProfileId, usePublications } from "@lens-protocol/react-web";
import Image from "next/image";
import Publication from "./Publication";

const Publications = () => {
  const { data, error, loading } = usePublications({
    profileId: "0x01" as ProfileId,
  });

  if (error) {
    <div>Error</div>;
  }

  if (loading) {
    <div>Loading</div>;
  }
  if (data) {
    console.log(data[0]);
  }

  return (
    <div>
      <div>1</div>
      {data?.map(({ id }) => (
        <Publication publicationId={id} key={id} />
      ))}
    </div>
  );
};

export default Publications;
