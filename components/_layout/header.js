import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Search2Icon } from "@chakra-ui/icons";
import { useSession, signIn } from "next-auth/react";
import SwitchMode from "../SwitchMode";
import AvatarMenu from "../AvatarMenu";

export default function Header() {
  const { data: session, status } = useSession();
 
  if (status === "loading") {
    return <Text>loading</Text>
  }
  return (
    <HStack justifyContent="space-between" p={2}>
      <Link href="/">
        <Text fontWeight="bold" fontSize="2xl" _hover={{ cursor: "pointer" }}>
          V3EX
        </Text>
      </Link>
      <Search2Icon />
      <Box display="flex">
        {!session ? (
          <Button onClick={() => signIn()} size="sm">
            登录
          </Button>
        ) : (
          <AvatarMenu image={session.user.image} />
        )}
        <SwitchMode />
      </Box>
    </HStack>
  );
}
