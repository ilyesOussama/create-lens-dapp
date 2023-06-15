import {
  ProfileOwnedByMe,
  ContentFocus,
  useCreateComment,
  ContentPublication,
  PublicationId,
} from "@lens-protocol/react-web";
import { Button } from "../ui/button";
import { useState } from "react";
import { Editor } from "../textEditor";

const CreateComment = ({
  publicationId,
  publisher,
}: {
  publisher: ProfileOwnedByMe;
  publicationId: PublicationId;
}) => {
  const [data, setData] = useState("");
  const [transaction, setTransaction] = useState("");
  const {
    execute: create,
    error,
    isPending,
  } = useCreateComment({ publisher, upload: uploadJson });

  async function uploadJson(data: unknown) {
    try {
      const response = await fetch("/api/uploadToBundlr", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setTransaction(json.url);
      return json.url;
    } catch (err) {
      console.log({ err });
    }
  }

  async function createPost() {
    await create({
      content: data,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: "en",
      publicationId,
    });
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Editor onDataChange={setData} />
      <Button onClick={createPost}>Create Comment</Button>
      {transaction && (
        <a target="_blank" rel="no-opener" href={transaction}>
          View Arweave Data
        </a>
      )}
    </div>
  );
};

export default CreateComment;
