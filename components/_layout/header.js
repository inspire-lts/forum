import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Search2Icon } from "@chakra-ui/icons";
import { useSession, signIn } from "next-auth/react";
import SwitchMode from "../SwitchMode";

export default function Header() {
  const { data: session } = useSession()
  return (
    <HStack
      justifyContent="space-between"
      p={2}>
      <Link
        href="/">
          <Text fontWeight="bold" fontSize="2xl" _hover={{cursor: "pointer"}}>V3EX</Text>
      </Link>
      <Search2Icon/>
      <Box>
        {
          !session ? 
          <Button onClick={() => signIn()} size="sm">登录</Button> : 
          <Avatar src={session.user.image}/>
        }
        <SwitchMode/>
      </Box>
    </HStack>
  )

}