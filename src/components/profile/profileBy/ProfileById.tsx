import { ProfileId, useProfile } from "@lens-protocol/react-web";
import React from "react";
import { Publications } from "@/components/publication";
import { ProfileBio } from "@/components/profile";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const ProfileById = ({ profileId }: { profileId: ProfileId }) => {
  const {
    data: profile,
    error,
    loading,
  } = useProfile({
    profileId,
  });

  if (error) {
    return <div className="container mx-auto">Error</div>;
  }
  if (loading) {
    return (
      <div className="container mx-auto">
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
      <Publications profileId={profileId} />
    </div>
  );
};

export { ProfileById };
