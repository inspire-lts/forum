import { HStack, VStack, Text } from "@chakra-ui/react";
import { format } from "timeago.js";

export default function PostList({ post }) {
  console.log(post.authorId)
  return (
    <HStack>
      <VStack>
        <Text>{post.title}</Text>
        <Text>{format(post.createdAt, 'zh_CN')}</Text>
      </VStack>
    </HStack>
  )
}