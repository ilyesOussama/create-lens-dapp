import {
  PublicationOwnedByMe,
  useHidePublication,
} from "@lens-protocol/react-web";
import { TrashIcon } from "lucide-react";
import React from "react";

const HidePublication = ({
  publication,
}: {
  publication: PublicationOwnedByMe;
}) => {
  const {
    execute: hidePublication,
    isPending,
    error,
  } = useHidePublication({
    publication,
  });

  const handleHidePublication = async () => {
    const result = await hidePublication();
  };

  return (
    <TrashIcon
      onClick={handleHidePublication}
      className="cursor-pointer text-red-500 hover:text-red-700"
      size={20}
    />
  );
};

export { HidePublication };
