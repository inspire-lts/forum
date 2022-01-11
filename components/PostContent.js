import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { format } from "timeago.js";
import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "./MDXComponent";
import { useRouter } from "next/router";
import Append from "./Append";

export default function PostContent({ post, content }) {
  const router = useRouter();
  const { data, error } = useSWR(`/api/post/${post[0].authorId}`, fetcher);
  const { data: append } = useSWR(`/api/append/${post[0].id}`, fetcher);

  console.log(content, "content")
  return (
    <VStack w="80%" boxShadow="base" p={2}>
      <HStack justifyContent="space-between" w="100%" px={2}>
        <Text fontWeight="bold" fontSize="2xl">
          {post[0].title}
        </Text>
        <Avatar src={data?.image} size="sm" />
      </HStack>
      <HStack w="100%" px={2}>
        <Text color="gray.300" fontSize="xs">
          {data?.name}
        </Text>
        <Text color="gray.300" fontSize="xs">
          {format(post[0].createdAt, "zh_CN")}
        </Text>
        {data?.id === post[0].authorId && append?.length < 3 && (
          <Button
            color="gray.400"
            size={"xs"}
            onClick={() => router.push(`/append/${post[0]?.id}`)}
          >
            append
          </Button>
        )}
      </HStack>
      <Divider />
      <MDXRemote {...content} components={MDXComponents} />
      <Divider />
      <Append w="100%" postId={post[0].id} />
    </VStack>
  );
}
