import { ProfileId, useProfile } from "@lens-protocol/react-web";
import { LoadingSpinner } from "../LoadingSpinner";

const FollowingAndFollowers = ({ profileId }: { profileId: ProfileId }) => {
  const { data, error, loading } = useProfile({
    profileId: profileId,
  });
  if (loading) return;
  <div className="container mx-auto">
    <LoadingSpinner />
  </div>;

  if (error) return <div className="container mx-auto">Error</div>;
  return (
    <div>
      <div>Following: {data.stats.totalFollowing}</div>
      <div>Following: {data.stats.totalFollowers}</div>
    </div>
  );
};

export { FollowingAndFollowers };
