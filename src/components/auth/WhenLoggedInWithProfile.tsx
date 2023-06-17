import {
  ProfileOwnedByMe,
  useActiveProfile,
  useActiveWallet,
  WalletData,
} from "@lens-protocol/react-web";
import { ReactNode, useContext } from "react";
import { AvatarDropdown } from "../profile";
import { PublisherContext } from "@/context/ProfileContext";

type LoggedInConfig = {
  wallet: WalletData;
  profile: ProfileOwnedByMe;
};

export type WhenLoggedInWithProfileProps = {
  children: (config: LoggedInConfig) => ReactNode;
};

const WhenLoggedInWithProfile = ({
  handleLogout,
}: {
  handleLogout?: () => void;
}) => {
  const { data: wallet, loading: walletLoading } = useActiveWallet();
  const { data: profile, error, loading: profileLoading } = useActiveProfile();

  const { setProfileOwnedByMe } = useContext(PublisherContext);

  const { data: ProfileOwnedByMed } = useActiveProfile();

  if (walletLoading || profileLoading) {
    return null;
  }

  if (wallet === null) {
    return null;
  }

  if (profile === null || error) {
    // TODO guide user to create profile
    return null;
  }
  if (profile && wallet) {
    setProfileOwnedByMe(ProfileOwnedByMed);
  }
  return <AvatarDropdown profileId={profile.id} logout={handleLogout} />;
};

export { WhenLoggedInWithProfile };
