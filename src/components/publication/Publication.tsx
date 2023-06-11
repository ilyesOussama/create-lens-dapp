import { convertIpfsUrl } from "@/lib/convertIpfsUrl";
import { PublicationId, usePublication } from "@lens-protocol/react-web";
import Image from "next/image";
import PublicationComments from "./PublicationComments";

const Publication = ({ publicationId }: { publicationId: PublicationId }) => {
  const { data, error, loading } = usePublication({
    publicationId,
  });

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>{data.metadata?.content}</div>
      <div>
        {data.metadata?.image && (
          <Image
            alt="alt"
            width={200}
            height={200}
            src={convertIpfsUrl(data.metadata?.image)}
          />
        )}
      </div>
      <PublicationComments publicationId={data.id} />
    </div>
  );
};

export default Publication;
