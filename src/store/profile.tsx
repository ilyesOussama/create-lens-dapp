import { create } from "zustand";

type userProfileStoreState = {
  userId: null | string;
  address: null | string;
  token: null | string;
  handle: null | string;
  profile: null | object;
  setUserId: (id) => void;
  setAddress: (address) => void;
  setToken: (token) => void;
  setHandle: (handle) => void;
  setProfile: (profileObject) => void;
};

export const useProfileStore = create<userProfileStoreState>((set) => ({
  userId: null,
  address: null,
  token: null,
  handle: null,
  profile: null,
  setUserId: (id) => set({ userId: id }),
  setAddress: (address) => set({ address }),
  setToken: (token) => set({ token }),
  setHandle: (handle) => set({ handle }),
  setProfile: (profileObject) => set({ profile: profileObject }),
}));
