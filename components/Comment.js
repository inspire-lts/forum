import { Avatar, HStack, Text, VStack, Box, Divider } from "@chakra-ui/react";
import { format } from "timeago.js";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function Comment({ comment }) {
  const { data, error } = useSWR(`/api/post/${comment.authorId}`, fetcher);

  return (
    <VStack alignItems="flex-start" w="80%" px={1}>
      <HStack px={0}>
        <Avatar src={data?.image} size="sm" />
        <Box>
          <Text color="gray.400">{data.name}</Text>
          <Text color="gray.400">{format(comment.createdAt, "zh_CN")}</Text>
        </Box>
      </HStack>
      <Text>{comment.content}</Text>
      <Divider />
    </VStack>
  );
}
