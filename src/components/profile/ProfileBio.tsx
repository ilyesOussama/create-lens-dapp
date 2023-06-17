import { Profile } from "@lens-protocol/react-web";

const ProfileBio = ({ profile }: { profile: Profile }) => {
  return <div>{profile?.bio}</div>;
};

export { ProfileBio };
