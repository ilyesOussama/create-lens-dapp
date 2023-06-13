"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import {
  ProfileId,
  ProfileOwnedByMe,
  PublicationId,
} from "@lens-protocol/react-web";
import { Publications } from "@/components/publication";
import { Publication } from "@/components/publication";
import CreateComment from "@/components/create/CreateComment";
import { SearchPublications } from "@/components/search";
import { SearchProfiles } from "@/components/search";
import { useState } from "react";

export default function Home() {
  const [publisher, setPublisher] = useState<null | ProfileOwnedByMe>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <div className="flex flex-col gap-2">
        <h2>Auth</h2>
        <LoginButton />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Publications</h2>
        <Publications profileId={"0x01" as ProfileId} />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Publication</h2>
        <Publication
          publicationId={"0x01-0x01e3-DA-97de303d" as PublicationId}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Create Post</h2>
        {publisher && <CreatePost publisher={publisher} />}
      </div>
      <div className="flex flex-col gap-2">
        <h2>Create Comment</h2>
        {publisher && (
          <CreateComment
            publisher={publisher}
            publicationId={"0x01-0x01e3-DA-97de303d" as PublicationId}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2>Search Publications</h2>
        <SearchPublications query="lens" />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Search Profiles</h2>
        <SearchProfiles query="st" />
      </div>
    </main>
  );
}
