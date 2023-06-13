import { useState } from "react";
import ReactPlayer from "react-player";
import { getSubstring } from "@/lib/utils";
import { AiOutlinePause, AiOutlinePlayCircle } from "react-icons/ai";
import Image from "next/image";

const AudioPlayer = ({ publication, url, cover }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  function updateIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  const { profile } = publication;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md">
      <div className={`flex items-center`} onClick={updateIsPlaying}>
        <ReactPlayer
          url={url}
          playing={isPlaying}
          className="hidden"
          controls
        />
        <div className="p-2">
          {cover ? (
            <Image
              src={cover}
              width={200}
              height={200}
              alt="cover"
              className="w-24 h-24 rounded-md"
            />
          ) : (
            <div />
          )}
        </div>
        <div className="p-2">
          <p className={`text-xl font-bold mb-0`}>{profile.name}</p>
          <p className={`text-sm mb-0 text-green-400`}>
            {getSubstring(publication?.metadata?.name, 30)}
          </p>
        </div>
        <div className="flex justify-end flex-1 ml-5 pr-10 md:pr-5">
          <div className={`flex items-center justify-center`}>
            {isPlaying ? (
              <AiOutlinePause className="w-8 h-8" />
            ) : (
              <AiOutlinePlayCircle className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AudioPlayer };
