import { ProfileId, useProfile } from "@lens-protocol/react-web";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertIpfsUrl } from "@/lib/convertIpfsUrl";

const ProfileAvatar = ({
  profileId,
  onClick,
}: {
  profileId: ProfileId;
  onClick?: () => void;
}) => {
  const { data, error, loading } = useProfile({
    profileId: profileId,
  });
  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;

  const src = convertIpfsUrl(data?.picture?.original?.url);

  return (
    <Avatar onClick={onClick}>
      <AvatarImage src={src} alt={data.handle} />
      <AvatarFallback>{data?.handle}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
