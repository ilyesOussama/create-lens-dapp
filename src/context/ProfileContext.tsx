import { ProfileOwnedByMe } from "@lens-protocol/react-web";
import { createContext, useState } from "react";

interface PublisherContextType {
  profileOwnedByMe: ProfileOwnedByMe | null | undefined;
  setProfileOwnedByMe: (profile: ProfileOwnedByMe | null | undefined) => void;
}

const PublisherContext = createContext<PublisherContextType>({
  profileOwnedByMe: undefined,
  setProfileOwnedByMe: () => {},
});

const PublisherContextProvider = ({ children }) => {
  const [profileOwnedByMe, setProfileOwnedByMe] = useState<
    ProfileOwnedByMe | undefined | null
  >(null);

  return (
    <PublisherContext.Provider
      value={{ profileOwnedByMe, setProfileOwnedByMe }}
    >
      {children}
    </PublisherContext.Provider>
  );
};
export { PublisherContext, PublisherContextProvider };
