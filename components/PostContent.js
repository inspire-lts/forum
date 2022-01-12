import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import fetcher from "../lib/fetcher";
import { format } from "timeago.js";
import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "./MDXComponent";
import { useRouter } from "next/router";
import Append from "./Append";
import { useState } from "react";

export default function PostContent({ post, content }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/user/${post?.authorId}`, fetcher);
  const { data: append } = useSWR(`/api/append/${post?.id}`, fetcher);
  const isAlreadyFavoriting = !!post?.favoritedBy.find(
    (f) => f.email === session?.user?.email
  );
  const [favorite, setFavorite] = useState(isAlreadyFavoriting);
  const favoriteCount = post?.favoritedBy?.length;

  const submitFavorite = async () => {
    const operation = !favorite ? "connect" : "disconnect";
    await fetch(`/api/favorite/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation }),
    });
    setFavorite(!favorite);
    mutate(`/api/post/${post?.id}`)
  };
  return (
    <VStack w="80%" boxShadow="base" p={2}>
      <HStack justifyContent="space-between" w="100%" px={2}>
        <Text fontWeight="bold" fontSize="2xl">
          {post?.title}
        </Text>
        <Avatar src={data?.image} size="sm" />
      </HStack>
      <HStack w="100%" px={2}>
        <Text color="gray.300" fontSize="xs">
          {data?.name}
        </Text>
        <Text color="gray.300" fontSize="xs">
          {format(post?.createdAt, "zh_CN")}
        </Text>
        {data?.id === post?.authorId && append?.length < 3 && (
          <Button
            color="gray.400"
            size={"xs"}
            onClick={() => router.push(`/append/${post?.id}`)}
          >
            append
          </Button>
        )}
      </HStack>
      <Divider />
      <MDXRemote {...content} components={MDXComponents} />
      <Divider />
      <Append w="100%" postId={post?.id} />
      <HStack justifyContent={"space-between"} w={"100%"} px={2}>
        <Button size={"xs"} onClick={submitFavorite} color="gray.400">
          {!favorite ? "加入收藏" : "取消收藏"}
        </Button>
        <Text color="gray.400">{favoriteCount}人收藏</Text>
      </HStack>
    </VStack>
  );
}
