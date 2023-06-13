import { useFollow, Profile, ProfileOwnedByMe } from "@lens-protocol/react-web";
import { Button } from "./ui/button";

const FollowButton = ({
  followee,
  follower,
}: {
  followee: Profile;
  follower: ProfileOwnedByMe;
}) => {
  const { execute, error, isPending } = useFollow({ followee, follower });

  const follow = async () => {
    const result = await execute();

    if (result.isFailure()) {
      console.error(result.error);
    }
  };

  if (followee.followStatus?.canFollow === false) {
    return null;
  }

  if (followee.followStatus?.isFollowedByMe) {
    return <p>You are following this profile</p>;
  }

  return (
    <Button onClick={follow} disabled={isPending}>
      Follow
    </Button>
  );
};

export { FollowButton };
