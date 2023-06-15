import {
  ProfileOwnedByMe,
  useCreatePost,
  ContentFocus,
} from "@lens-protocol/react-web";
import { Button } from "../ui/button";
import { useState } from "react";
import { Editor } from "../textEditor";

const CreatePost = ({ publisher }: { publisher: ProfileOwnedByMe }) => {
  const [data, setData] = useState("");
  const [transaction, setTransaction] = useState("");
  const {
    execute: create,
    error,
    isPending,
  } = useCreatePost({ publisher, upload: uploadJson });

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
    });
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Editor onDataChange={setData} />
      <Button onClick={createPost}>Create Post</Button>
      {transaction && (
        <a target="_blank" rel="no-opener" href={transaction}>
          View Arweave Data
        </a>
      )}
    </div>
  );
};

export default CreatePost;
