import { HStack, VStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import reletiveTime from "dayjs/plugin/relativeTime";
dayjs.extend(reletiveTime)
export default function PostList({ post }) {

  return (
    <HStack>
      <VStack>
        <Text>{post.title}</Text>
        <Text>{dayjs().from(dayjs(post.createdAt).format("YYYY/MM/DD HH:mm"))}</Text>
      </VStack>
    </HStack>
  )
}