import {
  HStack,
  VStack,
  Text,
  Avatar,
  Box,
  Divider,
  Button,
  Tag,
} from "@chakra-ui/react";
import { format } from "timeago.js";
import Link from "next/link";

export default function PostList({ post }) {
  const { author, comment } = post;

  return (
    <HStack
      border="1px"
      borderColor="gray.200"
      borderRadius="5px"
      p={2}
      w="100%"
      justifyContent="space-between"
    >
      <HStack>
        <Avatar src={author?.image} />
        <VStack spacing={0}>
          <Link href={`/post/${post.id}`}>
            <Text fontSize="xl" _hover={{ cursor: "pointer" }}>
              {post.title}
            </Text>
          </Link>
          <HStack>
            <Button color="gray.300" size="xs" p={1}>
              {post.category}
            </Button>
            <Text fontSize="xs">{author?.name}</Text>
            <Text color="gray.300" fontSize="xs">
              {format(post.createdAt, "zh_CN")}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Tag ml="20px">{comment?.length}</Tag>
    </HStack>
  );
}
