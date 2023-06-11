import { ProfileId, useProfile } from "@lens-protocol/react-web";

const FollowingAndFollowers = ({ profileId }: { profileId: ProfileId }) => {
  const { data, error, loading } = useProfile({
    profileId: profileId,
  });
  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;
  return (
    <div>
      <div>Following: {data.stats.totalFollowing}</div>
      <div>Following: {data.stats.totalFollowers}</div>
    </div>
  );
};

export default FollowingAndFollowers;
