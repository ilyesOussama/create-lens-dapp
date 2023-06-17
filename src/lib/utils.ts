import { Profile } from "@lens-protocol/react-web";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const returnIpfsPathOrUrl = (
  uri: string,
  ipfsGateway: string = "https://gateway.ipfscdn.io/ipfs"
) => {
  if (uri.startsWith("ipfs://")) {
    let result = uri.substring(7, uri.length);
    return `${ipfsGateway}/${result}`;
  } else if (uri.startsWith("ar://")) {
    let result = uri.substring(5, uri.length);
    return `https://arweave.net/${result}`;
  } else {
    return uri;
  }
};

export const getSubstring = (string, length = 130) => {
  if (string.length <= length) {
    return string;
  } else {
    return `${string.substring(0, length)}...`;
  }
};

export const formatHandleColors = (text: string) => {
  text = text.replaceAll(".lens", "");
  text = text.replace(
    /(https\S+)/g,
    `<a target="__blank" style="color: #AEF359;">$1</a>`
  );
  return text.replace(
    /@(\w+)/g,
    `<a href="/profile/$1.lens" style="color: #AEF359;">@$1</a>`
  );
};

export const formatProfilePictures = (profiles: Profile[]) => {
  return profiles.map((profile) => {
    let { picture, coverPicture } = profile;
    if (picture && picture.__typename === "MediaSet") {
      if (picture.original) {
        picture.original.url = returnIpfsPathOrUrl(picture.original.url);
      }
    }
    if (coverPicture && coverPicture.__typename === "MediaSet") {
      if (coverPicture.original.url) {
        coverPicture.original.url = returnIpfsPathOrUrl(
          coverPicture.original.url
        );
      }
    }
    return profile;
  });
};

export const formatProfilePicture = (profile: Profile) => {
  profile = JSON.parse(JSON.stringify(profile));
  let { picture, coverPicture } = profile;
  if (picture && picture.__typename === "MediaSet") {
    if (picture.original) {
      picture.original.url = returnIpfsPathOrUrl(picture.original.url);
    }
  }
  if (coverPicture && coverPicture.__typename === "MediaSet") {
    if (coverPicture.original.url) {
      coverPicture.original.url = returnIpfsPathOrUrl(
        coverPicture.original.url
      );
    }
  }
  return profile;
};

export const configureMirrorAndIpfsUrl = (items: any[]) => {
  return items.map((item) => {
    if (item.profileSet) return item;
    let { profile } = item;
    if (item.__typename === "Mirror") {
      if (item.mirrorOf) {
        item.originalProfile = profile;
        item.stats = item.mirrorOf.stats;
        profile = item.mirrorOf.profile;
      }
    }
    if (
      profile.picture &&
      profile.picture.__typename === "MediaSet" &&
      profile.picture.original
    ) {
      const url = returnIpfsPathOrUrl(profile.picture.original.url);
      if (url) {
        profile.picture.original.url = url;
      } else {
        profile.missingAvatar = true;
      }
    } else {
      profile.missingAvatar = true;
    }

    item.profile = profile;
    item.profileSet = true;
    return item;
  });
};

export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
