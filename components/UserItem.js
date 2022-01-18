import { Avatar, Box, HStack, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function UserItem({ follow }) {
  const router = useRouter();

  return (
    <HStack w={"100%"} justifyContent={"space-around"}>
      <Avatar src={follow.image} />
      <Text fontSize={"xl"}>{follow.name}</Text>
      <Button
        size={"sm"}
        onClick={() => router.push(`/dashboard/${follow.id}`)}
      >
        进入个人主页
      </Button>
    </HStack>
  );
}
