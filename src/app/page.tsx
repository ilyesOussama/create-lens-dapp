"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import { ProfileId, PublicationId } from "@lens-protocol/react-web";
import { Publications } from "@/components/publication";
import { Publication } from "@/components/publication";
import CreateComment from "@/components/create/CreateComment";
import { SearchPublications } from "@/components/search";
import { SearchProfiles } from "@/components/search";
import { useContext, useState } from "react";
import { PublicationSkeleton } from "@/components/ui/skeletons/PublicationSkeleton";
import { PublisherContext } from "@/context/ProfileContext";
import { Feed } from "@/components/Feed";
import Link from "next/link";

export default function Home() {
  const { profileOwnedByMe: publisher } = useContext(PublisherContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <h1>
        This is a demo of some the components provided by{" "}
        <Link href="https://github.com/ilyesOussama/create-lens-dapp/">
          create-lens-dapp
        </Link>
      </h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Auth
        </h2>
        <LoginButton />
      </div>

      {publisher && (
        <div>
          <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
            Feed
          </h2>
          <Feed limit={5} />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Publications
        </h2>
        <Publications profileId={"0x01" as ProfileId} limit={5} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Publication
        </h2>
        <Publication
          publicationId={"0x01-0x01e3-DA-97de303d" as PublicationId}
        />
      </div>

      {publisher && (
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
            Create Post
          </h2>
          <CreatePost publisher={publisher} />
        </div>
      )}

      {publisher && (
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
            Create Comment
          </h2>
          <CreateComment
            publisher={publisher}
            publicationId={"0x01-0x01e3-DA-97de303d" as PublicationId}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Search Publications
        </h2>
        <SearchPublications query="lens" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Search Profiles
        </h2>
        <SearchProfiles query="st" />
      </div>
    </main>
  );
}
