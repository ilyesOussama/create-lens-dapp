"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import { useProfilesOwnedByMe } from "@lens-protocol/react-web";
import Publications from "@/components/publication/Publications";
import Publication from "@/components/publication/Publication";
import CreateComment from "@/components/create/CreateComment";

export default function Home() {
  const { data: publisher } = useProfilesOwnedByMe();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Auth</h2>
        <LoginButton />
      </div>
      <div>
        <h2>Publications</h2>
        <Publications profileId={"0x01"} />
      </div>
      <div>
        <h2>Publication</h2>
        <Publication publicationId={"0x01-0x01e3-DA-97de303d"} />
      </div>
      <div>
        <h2>Create Post</h2>
        {publisher && <CreatePost publisher={publisher[0]} />}
      </div>
      <div>
        <h2>Create Comment</h2>
        {publisher && (
          <CreateComment
            publisher={publisher[0]}
            publicationId={"0x01-0x01e3-DA-97de303d"}
          />
        )}
      </div>
    </main>
  );
}
