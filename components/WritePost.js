import { Avatar, HStack, Input, Text } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function WritePost() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Text>loading</Text>;
  }
  return (
    <HStack
      p={2}
      w="100%"
      borderRadius="5px"
      border="1px"
      borderColor="gray.200"
    >
      <Avatar
        src={
          session?.user.image ||
          "https://api-private.atlassian.com/users/850ae4c9bf8ca767eb65b41f527f5e3b/avatar"
        }
      />
      <Input
        placeholder="创建帖子"
        onClick={(_) => (session ? router.push("/write") : signIn())}
        type="text"
      />
    </HStack>
  );
}
