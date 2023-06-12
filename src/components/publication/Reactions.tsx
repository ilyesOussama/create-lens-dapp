import { cn } from "@/lib/utils";
import {
  ProfileId,
  useReaction,
  ContentPublication,
  ReactionType,
  useCreateMirror,
  ProfileOwnedByMe,
  useCollect,
} from "@lens-protocol/react-web";

import { Heart, Repeat2, Ungroup } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiCollection, HiOutlineCollection } from "react-icons/hi";

const Reactions = ({
  publication,
  profileId,
  publisher,
}: {
  publication: ContentPublication;
  profileId: ProfileId;
  publisher: ProfileOwnedByMe;
}) => {
  const [isLikedByMe, setIsLikedByMe] = useState(publication.reaction);
  const [isMirroedByMe, setisMirroedByMe] = useState(
    publication.isMirroredByMe
  );

  const [isCollectedByMe, setIsCollectedByMe] = useState(false);

  const { addReaction, hasReaction, removeReaction, isPending } = useReaction({
    profileId,
  });

  const {
    execute: mirror,
    error,
    isPending: mirrorPending,
  } = useCreateMirror({
    publisher,
  });

  const { execute: collect } = useCollect({
    publication,
    collector: publisher,
  });

  const likePressHandler = () => {
    addReaction({ publication, reactionType: ReactionType.UPVOTE });
  };

  //WORK ON THIS
  const removeLikeHandler = () => {
    console.log("removeLikeHandler");
  };

  const mirrorPressHandler = () => {
    mirror({
      publication,
    });
  };

  const collectPressHandler = () => {
    collect();
  };

  return (
    <ul className="flex flex-row justify-between">
      <li
        onClick={
          isLikedByMe === "UPVOTE" ? removeLikeHandler : likePressHandler
        }
        className="cursor-pointer"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="z-10">
              {isLikedByMe === "UPVOTE" ? (
                <AiFillHeart className="w-8 h-8 fill-red-400 hover:fill-red-400" />
              ) : (
                <AiOutlineHeart className="w-8 h-8 hover:fill-red-400" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{isLikedByMe === "UPVOTE" ? "Unlike" : "Like"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
      <li onClick={mirrorPressHandler} className="cursor-pointer">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {isMirroedByMe ? (
                <Repeat2 className="w-8 h-8 fill-red-400 hover:fill-blue-400" />
              ) : (
                <Repeat2 className="w-8 h-8 hover:fill-blue-400" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Mirror</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
      <li onClick={collectPressHandler} className="cursor-pointer">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {isMirroedByMe ? (
                <HiCollection className="w-8 h-8 fill-red-200 hover:fill-emerald-400" />
              ) : (
                <HiOutlineCollection className="w-8 h-8 hover:fill-emerald-400" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Collect</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    </ul>
  );
};

export default Reactions;
