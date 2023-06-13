"use client";

import CreateComment from "@/components/create/CreateComment";
import { Publication } from "@/components/publication";
import { PublicationComments } from "@/components/publication";
import { PublicationId } from "@lens-protocol/react-web";
import { useParams } from "next/navigation";

const PublicationPage = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4 border border-1 border-gray-200 dark:border-gray-700 container p-4 rounded-sm">
      <Publication publicationId={id as PublicationId} />
      <PublicationComments publicationId={id as PublicationId} />
    </div>
  );
};

export default PublicationPage;
