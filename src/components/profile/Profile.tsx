import { ProfileId } from "@lens-protocol/react-web";
import React from "react";
import { ProfileByHandle, ProfileById } from "@/components/profile";

const Profile = ({
  profileId,
  handle,
}: {
  profileId?: ProfileId;
  handle?: string;
}) => {
  if (profileId) {
    return <ProfileById profileId={profileId} />;
  }
  if (handle) {
    return <ProfileByHandle handle={handle} />;
  }

  return (
    <div className="p-4 bg-red-400">Please Provide a profileId or handle</div>
  );
};

export { Profile };
