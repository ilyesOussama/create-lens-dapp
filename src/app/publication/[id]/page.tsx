"use client";

import CreateComment from "@/components/create/CreateComment";
import { Publication } from "@/components/publication";
import { PublicationComments } from "@/components/publication";
import { PublisherContext } from "@/context/ProfileContext";
import { PublicationId } from "@lens-protocol/react-web";
import { useParams } from "next/navigation";
import { useContext } from "react";

const PublicationPage = () => {
  const { profileOwnedByMe: publisher } = useContext(PublisherContext);
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4 container">
      <div className="border border-1 border-gray-200 dark:border-gray-700 container p-4 rounded-sm">
        <Publication publicationId={id as PublicationId} />
      </div>
      {publisher && (
        <CreateComment
          publicationId={id as PublicationId}
          publisher={publisher}
        />
      )}
      <PublicationComments publicationId={id as PublicationId} />
    </div>
  );
};

export default PublicationPage;
