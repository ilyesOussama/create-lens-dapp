import {
  ProfileOwnedByMe,
  useActiveProfile,
  useActiveWallet,
  WalletData,
} from "@lens-protocol/react-web";
import { ReactNode } from "react";
import AvatarDropdown from "../profile/ProfileAvatarWithDropDown";

type LoggedInConfig = {
  wallet: WalletData;
  profile: ProfileOwnedByMe;
};

export type WhenLoggedInWithProfileProps = {
  children: (config: LoggedInConfig) => ReactNode;
};

export const WhenLoggedInWithProfile = ({
  handleLogout,
}: {
  handleLogout?: () => void;
}) => {
  const { data: wallet, loading: walletLoading } = useActiveWallet();
  const { data: profile, error, loading: profileLoading } = useActiveProfile();

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

  return <AvatarDropdown profileId={profile.id} logout={handleLogout} />;
};
