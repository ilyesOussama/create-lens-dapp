import { ProfileId, useProfile } from "@lens-protocol/react-web";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertIpfsUrl } from "@/lib/convertIpfsUrl";

const ProfileAvatar = ({ profileId }: { profileId: ProfileId }) => {
  const {
    data: profile,
    error,
    loading,
  } = useProfile({
    profileId: profileId,
  });
  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;

  return (
    <Avatar>
      <AvatarImage
        src={
          profile?.picture?.__typename === "NftImage"
            ? profile?.picture?.uri
            : profile?.picture?.original?.url
        }
        alt={profile.handle}
      />
      <AvatarFallback>{profile?.handle}</AvatarFallback>
    </Avatar>
  );
};

export { ProfileAvatar };
