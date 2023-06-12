"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import {
  ProfileId,
  PublicationId,
  useProfilesOwnedByMe,
  usePublications,
} from "@lens-protocol/react-web";
import Publications from "@/components/publication/Publications";
import Publication from "@/components/publication/Publication";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Publications profileId={"0x01"} />
    </main>
  );
}
