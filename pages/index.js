import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import WritePost from "../components/WritePost";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import PostList from "../components/PostList";

export default function Component() {
  const { data, error } = useSWR("/api/write", fetcher);

  if (error) return <Box>服务器抽风了</Box>;

  return (
    <HStack p={5}>
      <VStack w="60%" h="80vh" alignItems="flex-start" spacing={6}>
        <WritePost />
        {data?.map((post) => {
          return <PostList post={post} key={post.id} />;
        })}
      </VStack>
    </HStack>
  );
}
