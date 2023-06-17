"use client";
import { ThemeProvider } from "next-themes";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { LensProvider, LensConfig, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

import { PublisherContextProvider } from "@/context/ProfileContext";

const { provider, webSocketProvider } = configureChains(
  [polygon, mainnet, polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <PublisherContextProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </PublisherContextProvider>
      </LensProvider>
    </WagmiConfig>
  );
};

export default Providers;
