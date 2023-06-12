"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import {
  ProfileId,
  PublicationId,
  useProfilesOwnedByMe,
  usePublication,
  usePublications,
} from "@lens-protocol/react-web";
import Publications from "@/components/publication/Publications";
import Publication from "@/components/publication/Publication";
import CreateComment from "@/components/create/CreateComment";

export default function Home() {
  const { data: publisher } = useProfilesOwnedByMe();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Publications profileId={"0x01"} />
      <Publication publicationId={"0x01821f-0x15"} />
      {publisher && <CreatePost publisher={publisher[0]} />}
      {publisher ? (
        <CreateComment
          publisher={publisher[0]}
          publicationId={"0x01821f-0x15"}
        />
      ) : (
        ""
      )}
    </main>
  );
}
