import {
  Text,
  VStack,
  Button,
  Textarea,
  Divider,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import Comment from "./Comment";

export default function PostComment({ post }) {
  const postId = post[0].id;
  const [replay, setReplay] = useState("");
  const { data } = useSWR(`/api/comment/${postId}`, fetcher);
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const toast = useToast();

  const handleReplay = (e) => {
    let replayValue = e.target.value;
    setReplay(replayValue);
  };

  const handleSubmit = async () => {
    if (!replay) {
      toast({
        title: "评论失败",
        description: "评论不能为空",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!session) {
      signIn();
    }
    await fetch(`/api/comment/${postId}`, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ replay }),
    });
    setReplay("");
    mutate(`/api/comment/${postId}`);
  };
  return (
    <VStack p={2} w="80%" border="1px" borderRadius="5px">
      <VStack w="100%">
        <Text>回复主题</Text>
        <Textarea
          w="100%"
          value={replay}
          onChange={handleReplay}
          placeholder="友善发表自己的意见哦~"
        />
        <Button onClick={handleSubmit} size="xs">
          发布回复
        </Button>
      </VStack>
      <Divider />
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} authorId={post[0].authorId} />;
      })}
    </VStack>
  );
}
