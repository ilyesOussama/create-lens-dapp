import { ProfileId, useProfile } from "@lens-protocol/react-web";
import React from "react";
import { Publications } from "@/components/publication";
import { ProfileBio } from "@/components/profile";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const ProfileByHandle = ({ handle }: { handle: string }) => {
  const {
    data: profile,
    error,
    loading,
  } = useProfile({
    handle,
  });

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2>handle: {profile.handle}</h2>
      <div>
        Bio:
        <ProfileBio profile={profile} />
      </div>
      <Publications profileId={profile.id} />
    </div>
  );
};

export { ProfileByHandle };
