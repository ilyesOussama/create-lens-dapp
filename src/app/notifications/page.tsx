"use client";

import { LoginButton } from "@/components/auth";
import Notifications from "@/components/notifications/Notifications";
import { PublisherContext } from "@/context/ProfileContext";
import { useContext } from "react";

const ProfilePage = () => {
  const { profileOwnedByMe } = useContext(PublisherContext);
  return (
    <div className="flex flex-col gap-4 border border-1 border-gray-200 dark:border-gray-700 container p-4 rounded-sm mx-auto">
      {profileOwnedByMe ? <Notifications /> : <LoginButton />}
    </div>
  );
};

export default ProfilePage;
