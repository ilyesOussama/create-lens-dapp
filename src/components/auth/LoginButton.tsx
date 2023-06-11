import {
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

  useEffect(() => {
    if (loginError) toast.error(loginError.message);
  }, [loginError]);

  return (
    <>
      <WhenLoggedInWithProfile>
        {() => (
          <Button onClick={onLogoutClick} disabled={isLogoutPending}>
            Log out
          </Button>
        )}
      </WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <Button onClick={onLoginClick} disabled={isLoginPending}>
          Log in
        </Button>
      </WhenLoggedOut>
    </>
  );
}