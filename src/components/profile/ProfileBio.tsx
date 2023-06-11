import { ProfileId, useProfile } from "@lens-protocol/react-web";

const ProfileBio = ({ profileId }: { profileId: ProfileId }) => {
  const { data, error, loading } = useProfile({
    profileId: profileId,
  });
  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;
  return <div>{data?.bio}</div>;
};

export default ProfileBio;
