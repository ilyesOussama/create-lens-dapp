"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import { ProfileId, PublicationId } from "@lens-protocol/react-web";
import { Publications } from "@/components/publication";
import { Publication } from "@/components/publication";
import CreateComment from "@/components/create/CreateComment";
import { SearchPublications } from "@/components/search";
import { SearchProfiles } from "@/components/search";
import { useContext } from "react";
import { PublisherContext } from "@/context/ProfileContext";
import { Feed } from "@/components/Feed";
import Link from "next/link";
import Notifications from "@/components/notifications/Notifications";

export default function Home() {
  const { profileOwnedByMe: publisher } = useContext(PublisherContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <h1 className="text-2xl lg:text-3xl text-center">
        This is a demo showcasing some of the
        <Link
          href="https://github.com/ilyesOussama/create-lens-dapp/"
          target="_blank"
          className="underline decoration-dashed text-green-600 dark:text-green-400 px-2"
        >
          create-lens-dapp
        </Link>
        components
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
        <h3 className="text-xl">
          Search results for the word &quot;lens&quot;
        </h3>
        <SearchPublications query="lens" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Search Profiles
        </h2>
        <h3 className="text-xl">Profiles search results for: &quot;st&quot;</h3>
        <SearchProfiles query="st" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-center text-green-600 text-xl lg:text-2xl dark:text-green-400">
          Notifications
        </h2>
        <Notifications />
      </div>
    </main>
  );
}
