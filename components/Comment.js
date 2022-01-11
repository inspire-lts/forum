import { Avatar, HStack, Text, VStack, Box, Divider } from "@chakra-ui/react";
import { format } from "timeago.js";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function Comment({ comment, authorId }) {
  const { data, error } = useSWR(`/api/post/${comment.authorId}`, fetcher);

  return (
    <VStack alignItems="flex-start" w="80%" px={1}>
      <HStack px={0}>
        <Avatar src={data?.image} size="sm" />
        <Box>
          <HStack>
            <Text color="gray.400">{data?.name}</Text>
            {comment.authorId === authorId && (
              <Text
                color="blue.300"
                border="1px"
                px={0.5}
                borderRadius="2px"
                fontSize="xs"
              >
                OP
              </Text>
            )}
          </HStack>
          <Text color="gray.400">{format(comment.createdAt, "zh_CN")}</Text>
        </Box>
      </HStack>
      <Text>{comment.content}</Text>
      <Divider />
    </VStack>
  );
}
