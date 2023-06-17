"use client";

import { Profile } from "@/components/profile";
import { ProfileId } from "@lens-protocol/react-web";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4 border border-1 border-gray-200 dark:border-gray-700 container p-4 rounded-sm">
      {id.startsWith("0x") ? (
        <Profile profileId={id as ProfileId} />
      ) : (
        <Profile handle={id} />
      )}
    </div>
  );
};

export default ProfilePage;
