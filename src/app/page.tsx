"use client";

import CreatePost from "@/components/create/CreatePost";
import { LoginButton } from "@/components/auth";
import { ProfileId, useProfilesOwnedByMe } from "@lens-protocol/react-web";
import Publications from "@/components/publication/Publications";
import ProfileAvatar from "@/components/profile/ProfileAvatar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Publications />
      <ProfileAvatar profileId={"0x05" as ProfileId} />
    </main>
  );
}
