import { Avatar, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotificationItem({ notification }) {
  const { image, informer, postId, postTitle, notifiedId } = notification;

  return (
    <HStack
      border={"1px"}
      borderColor={"gray"}
      borderRadius={"5px"}
      w={"50%"}
      p={2}
    >
      <Avatar src={image} _after={{cotent: {}}} />
      <Link href={`/dashboard/${notifiedId}`}>
        <Text color={"gray"} _hover={{ cursor: "pointer" }}>{informer}</Text>
      </Link>
      <Text>在文章</Text>
      <Link href={`/post/${postId}`}>
        <Text color={"blue.600"} _hover={{ cursor: "pointer" }}>
          {postTitle}
        </Text>
      </Link>
      <Text>提到了您</Text>
    </HStack>
  );
}
