import {
  ContentPublication,
  ProfileId,
  PublicationId,
  useProfilesOwnedByMe,
  usePublication,
} from "@lens-protocol/react-web";
import Image from "next/image";
import PublicationComments from "./PublicationComments";
import Reactions from "./Reactions";
import {
  formatHandleColors,
  getSubstring,
  returnIpfsPathOrUrl,
} from "@/lib/utils";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { AudioPlayer } from "../AudioPlayer";

const Publication = ({ publicationId }: { publicationId: PublicationId }) => {
  const { data, error, loading } = usePublication({
    publicationId,
  });

  const { data: publisher } = useProfilesOwnedByMe();

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
    <div>
      <div className="max-w-5xl p-4 border border-1 border-gray-300 dark:border-gray-700 rounded-sm flex flex-col gap-4">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {data?.metadata?.content &&
            formatHandleColors(getSubstring(data?.metadata?.content, 339), "/")}
        </ReactMarkdown>
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
            publisher={publisher[0]}
            profileId={"0x01821f" as ProfileId}
            publication={data as ContentPublication}
          />
        )}
      </div>
    </div>
  );
};

export default Publication;
