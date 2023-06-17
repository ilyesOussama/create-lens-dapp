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

import { motion } from "framer-motion";

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
  const [isLikedByMe, setIsLikedByMe] = useState<boolean | null>(
    publication?.reaction === "UPVOTE"
  );
  const [isDislikedByMe, setIsDislikedByMe] = useState<boolean | null>(
    publication?.reaction === "DOWNVOTE"
  );

  const [isMirroedByMe, setisMirroedByMe] = useState(
    publication?.isMirroredByMe
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
    addReaction({ publication, reactionType: ReactionType.UPVOTE }).then(() => {
      setIsLikedByMe(true);
    });
  };

  const removeLikeHandler = () => {
    removeReaction({
      reactionType: ReactionType.UPVOTE,
      publication,
    }).then(() => {
      setIsLikedByMe(false);
    });
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
      <li className={cn("flex items-center space-x-1")}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-label="Like"
          onClick={isLikedByMe ? removeLikeHandler : likePressHandler}
        >
          <div
            className={cn(
              "rounded-full p-1.5 flex items-center justify-center hover:bg-red-400/20"
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="z-10">
                  {isLikedByMe ? (
                    <AiFillHeart className="w-8 h-8 fill-red-400 hover:scale-110" />
                  ) : (
                    <AiOutlineHeart className="w-8 h-8 hover:scale-110" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLikedByMe ? "Unlike" : "Like"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.button>
      </li>

      <li className={cn("flex items-center space-x-1")}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-label="Mirror"
          onClick={mirrorPressHandler}
        >
          <div
            className={cn(
              "rounded-full p-1.5 hover:bg-green-400/20 flex items-center justify-center"
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isMirroedByMe ? (
                    <Repeat2 className="w-8 h-8 fill-red-400 hover:scale-110" />
                  ) : (
                    <Repeat2 className="w-8 h-8 hover:scale-110" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mirror</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.button>
      </li>

      <li className={cn("flex items-center space-x-1")}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-label="collect"
          onClick={collectPressHandler}
        >
          <div
            className={cn(
              "rounded-full flex items-center justify-center p-1.5 hover:bg-blue-300/20"
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isMirroedByMe ? (
                    <HiCollection className="w-8 h-8 fill-red-200 hover:scale-110" />
                  ) : (
                    <HiOutlineCollection className="w-8 h-8 hover:scale-110" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Collect</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.button>
      </li>
    </ul>
  );
};

export { Reactions };
