"use client";

import { Profile } from "@/components/profile";
import { Publications } from "@/components/publication";
import { ProfileId } from "@lens-protocol/react-web";
import { useParams } from "next/navigation";
import { LoginButton } from "@/components/auth";

const ProfilePage = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4 border border-1 border-gray-200 dark:border-gray-700 container p-4 rounded-sm">
      <Profile profileId={id as ProfileId} />
      <LoginButton />
    </div>
  );
};

export default ProfilePage;
