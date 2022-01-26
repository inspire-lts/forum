import { Box, HStack, VStack, Text, Divider, Button } from "@chakra-ui/react";
import WritePost from "../components/WritePost";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import PostList from "../components/PostList";
import { myCategory } from "../lib/utils";
import Link from "next/link";

export default function Component() {
  const { data, error } = useSWR("/api/post", fetcher);
  if (error) return <Box>服务器抽风了</Box>;
  if (!data) return <Box>loading</Box>;
  return (
    <HStack
      p={5}
      justifyContent={"space-around"}
      h={"80vh"}
      alignItems={"flex-start"}
    >
      <VStack w="60%" alignItems="flex-start" spacing={6}>
        <WritePost />
        {data?.map((post) => {
          return <PostList post={post} key={post.id} />;
        })}
      </VStack>
      <VStack
        border={"1px"}
        borderColor={"gray.400"}
        borderRadius={"4px"}
        alignItems={"flex-start"}
        p={4}
      >
        <Text>类别</Text>
        <Divider />
        {myCategory.map((category) => {
          return (
            <Link href={`/tag/${category.value}`} key={category.value}>
              <Button size={"sm"}>{`#${category.value}`}</Button>
            </Link>
          );
        })}
      </VStack>
    </HStack>
  );
}
