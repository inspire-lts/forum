import { Avatar, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { format } from "timeago.js";

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
      <Avatar src={image} />
      <Link href={`/dashboard/${notifiedId}`}>
        <Text color={"gray"} _hover={{ cursor: "pointer" }} fontSize={"xl"}>
          {informer}
        </Text>
      </Link>
      <Text>在文章</Text>
      <Link href={`/post/${postId}`}>
        <Text color={"blue.600"}  _hover={{ cursor: "pointer" }} fontSize={"xl"}>
          {postTitle}
        </Text>
      </Link>
      <Text>提到了您</Text>
      <Text color={"gray.500"} fontSize={"xm"}>
        {format(notification.createdAt, "zh_CN")}
      </Text>
    </HStack>
  );
}
