// @ts-nocheck
"use client";

import {
  AnyPublication,
  ContentPublication,
  ProfileId,
  PublicationId,
  usePublication,
} from "@lens-protocol/react-web";
import Image from "next/image";
import { Reactions } from "./actions/Reactions";
import { formatHandleColors, returnIpfsPathOrUrl } from "@/lib/utils";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { AudioPlayer } from "../AudioPlayer";
import { ProfileAvatar } from "../profile";
import Link from "next/link";
import { PublicationSkeleton } from "../ui/skeletons/PublicationSkeleton";
import { PublisherContext } from "@/context/ProfileContext";
import { useContext, useEffect, useState } from "react";
import { Repeat } from "lucide-react";

const Publication = ({ publicationId }: { publicationId: PublicationId }) => {
  let [publication, setPublication] = useState<AnyPublication | undefined>([]);

  const { data, error, loading } = usePublication({
    publicationId,
  });

  useEffect(() => {
    setPublication(data);
  }, [data]);

  const { profileOwnedByMe: publisher } = useContext(PublisherContext);

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return (
      <div className="p-4">
        <PublicationSkeleton />
      </div>
    );
  }

  if (publication?.__typename === "Mirror") {
    publication = publication.mirrorOf;
  }

  let media, cover, mediaOriginalUrl;

  if (publication?.metadata?.media?.length) {
    media = { ...publication.metadata.media[0] };
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
    cover = returnIpfsPathOrUrl(publication.metadata.cover.original.url);
  }

  return (
    <>
      {publication && (
        <div>
          <div>
            <div className="max-w-5xl p-4 rounded-sm flex flex-col gap-4">
              {data?.__typename === "Mirror" && (
                <div className="flex flex-row gap-2 px-4">
                  <Repeat />
                  <Link href={`/profile/${data.profile.id}`}>
                    {data.profile.name}
                  </Link>
                  mirrored
                </div>
              )}
              <div className="flex flex-row gap-2">
                <Link href={`/profile/${publication.profile?.id}`}>
                  <ProfileAvatar profileId={publication.profile?.id} />
                </Link>
                <div className="max-w-full">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    className="text-clip"
                  >
                    {publication?.metadata?.content &&
                      formatHandleColors(publication?.metadata?.content)}
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
                <div className="flex justify-center">
                  <ReactPlayer url={mediaOriginalUrl} controls />
                </div>
              )}
              {media && media.type == "audio" && (
                <div>
                  <AudioPlayer
                    cover={cover}
                    publication={publication}
                    url={mediaOriginalUrl}
                  />
                </div>
              )}
            </div>
          </div>
          {publisher && (
            <Reactions
              publisher={publisher}
              profileId={"0x01821f" as ProfileId}
              publication={publication as ContentPublication}
            />
          )}
        </div>
      )}
    </>
  );
};

export { Publication };
