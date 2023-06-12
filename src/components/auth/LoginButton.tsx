import {
  ProfileId,
  useActiveProfile,
  useWalletLogin,
  useWalletLogout,
} from "@lens-protocol/react-web";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { WhenLoggedInWithProfile } from "./WhenLoggedInWithProfile";
import { WhenLoggedOut } from "./WhenLoggedOut";
import { Button } from "../ui/button";
import AvatarDropdown from "../profile/ProfileAvatarWithDropDown";

export function LoginButton({ handle }: { handle?: string }) {
  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();
  const { execute: logout, isPending: isLogoutPending } = useWalletLogout();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer, handle);
    }
  };

  const onLogoutClick = async () => {
    await logout();
    await disconnectAsync();
  };

  const { data: profile } = useActiveProfile();

  useEffect(() => {
    if (loginError) toast.error(loginError.message);
  }, [loginError]);

  return (
    <>
      <WhenLoggedInWithProfile handleLogout={onLogoutClick} />

      <WhenLoggedOut>
        <Button onClick={onLoginClick} disabled={isLoginPending}>
          Log in
        </Button>
      </WhenLoggedOut>
    </>
  );
}
