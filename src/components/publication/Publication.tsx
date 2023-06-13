// @ts-nocheck
"use client";

import {
  ContentPublication,
  ProfileId,
  ProfileOwnedByMe,
  PublicationId,
  useProfilesOwnedByMe,
  usePublication,
} from "@lens-protocol/react-web";
import Image from "next/image";
import { Reactions } from "./Reactions";
import {
  formatHandleColors,
  getSubstring,
  returnIpfsPathOrUrl,
} from "@/lib/utils";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { AudioPlayer } from "../AudioPlayer";
import { ProfileAvatar } from "../profile";
import Link from "next/link";

const Publication = ({
  publicationId,
  publisher,
}: {
  publicationId: PublicationId;
  publisher?: ProfileOwnedByMe;
}) => {
  const { data, error, loading } = usePublication({
    publicationId,
  });

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }

  const publicationPressHandler = () => {};

  let media, cover, mediaOriginalUrl;

  if (data?.metadata?.media?.length) {
    media = { ...data.metadata.media[0] };
    if (media && media.original) {
      if (
        media.original.mimeType === "image/jpg" ||
        media.original.mimeType === "image/jpeg" ||
        media.original.mimeType === "image/png" ||
        media.original.mimeType === "image/gif"
      ) {
        media.type = "image";
      }
      if (
        media.original.mimeType === "video/mp4" ||
        media.original.mimeType === "video/quicktime" ||
        media.original.mimeTuype === "application/x-mpegURL" ||
        media.original.mimeType === "video/MP2T"
      ) {
        media.type = "video";
      }
      if (
        media.original.mimeType === "audio/mpeg" ||
        media.original.mimeType === "audio/wav" ||
        media.original.mimeType === "audio/mp3"
      ) {
        media.type = "audio";
      }
      mediaOriginalUrl = returnIpfsPathOrUrl(media.original.url);
    }
  }

  if (data?.metadata?.cover) {
    cover = returnIpfsPathOrUrl(data.metadata.cover.original.url);
  }

  return (
    <Link href={`/publication/${data.id}`}>
      <div className="max-w-5xl p-4 rounded-sm flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Link href={`/profile/${data.profile.id}`}>
            <ProfileAvatar profileId={data.profile.id} />
          </Link>
          <div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {data?.metadata?.content &&
                formatHandleColors(
                  getSubstring(data?.metadata?.content, 339),
                  "/"
                )}
            </ReactMarkdown>
          </div>
        </div>
        {media && media.type == "image" && (
          <div>
            <Image
              src={mediaOriginalUrl}
              width={250}
              height={250}
              className="w-full h-full rounded-sm"
              alt="alt"
            />
          </div>
        )}

        {media && media.type == "video" && (
          <div className="w-full h-full rounded-sm">
            <ReactPlayer url={mediaOriginalUrl} controls />
          </div>
        )}
        {media && media.type == "audio" && (
          <div>
            <AudioPlayer
              cover={cover}
              publication={data}
              url={mediaOriginalUrl}
            />
          </div>
        )}

        {publisher && (
          <Reactions
            publisher={publisher}
            profileId={"0x01821f" as ProfileId}
            publication={data as ContentPublication}
          />
        )}
      </div>
    </Link>
  );
};

export { Publication };
