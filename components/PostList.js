import { HStack, VStack, Text, Avatar, Box, Divider } from "@chakra-ui/react";
import { format } from "timeago.js";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Link from "next/link";

export default function PostList({ post }) {
  const {data, error} = useSWR(`/api/post/${post.authorId}`, fetcher)
  
  return (
    <HStack border="1px" borderColor="gray.200" borderRadius="5px" p={1} w="100%">
      <Avatar src={data?.image} />
      <VStack spacing={0}>
        <Link href={ `/post/${post.title}`}>
          <Text fontSize="xl" _hover={{cursor: "pointer"}}>{post.title}</Text>
        </Link>
        <HStack>
          <Text color="gray.300" fontSize="xs">{post.category.split(" ")[1]}</Text>
          <Text color="gray.300" fontSize="xs">{data?.name}</Text>
          <Text color="gray.300" fontSize="xs">{format(post.createdAt, 'zh_CN')}</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}