import {
  Avatar,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import { signIn, useSession } from "next-auth/react";
import { format } from "timeago.js";
import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "./MDXComponent";
import { useRouter } from "next/router";
import Append from "./Append";
import { useState } from "react";
import Link from "next/link";

export default function PostContent({ post, content, session }) {
  const { author, append } = post;

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const isAlreadyFavoriting = !!post?.favoritedBy.find(
    (f) => f.email === session?.user?.email
  );
  const [favorite, setFavorite] = useState(isAlreadyFavoriting);
  const favoriteCount = post?.favoritedBy?.length;

  const submitFavorite = async () => {
    if (!session) {
      signIn();
      return;
    }
    const operation = !favorite ? "connect" : "disconnect";
    await fetch(`/api/favorite/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation }),
    });
    setFavorite(!favorite);
    mutate(`/api/post/${post?.id}`);
  };
  return (
    <VStack w="80%" boxShadow="base" p={2}>
      <HStack justifyContent="space-between" w="100%" px={2}>
        <Text fontWeight="bold" fontSize="2xl">
          {post?.title}
        </Text>
        <Avatar src={author?.image} size="sm" />
      </HStack>
      <HStack w="100%" px={2}>
        <Link href={`/dashboard/${author.id}`}>
          <Text color="gray.400" _hover={{ cursor: "pointer" }}>
            {author?.name}
          </Text>
        </Link>
        <Text color="gray.300" fontSize="xs">
          {format(post?.createdAt, "zh_CN")}
        </Text>
        {session?.user?.email === post.author.email && append?.length < 3 && (
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
