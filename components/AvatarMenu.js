import { Avatar, Box, VStack, Text, useOutsideClick } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useRef, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AvatarMenu({ image }) {
  const { data: session, status } = useSession();
  const { data: user } = useSWR(`/api/email/${session?.user?.email}`, fetcher);
  const [toggle, setToggle] = useState(false);
  const avatarRef = useRef(null);

  if (status === "loading") {
    return <Text>loading</Text>
  }

  useOutsideClick({
    ref: avatarRef,
    handler: () => setToggle(false),
  });
  return (
    <Box position="relative">
      <Avatar src={image} onClick={(_) => setToggle(true)} />
      {toggle && (
        <VStack
          position="absolute"
          spacing={2}
          borderRadius="5px"
          ref={avatarRef}
          border="1px"
          w="100px"
          shadow="base"
          right="2px"
          top="50px"
          _hover={{ cursor: "pointer"}}
        >
          <Link href={`/dashboard/${user.id}`}>
            <Text onClick={() => setToggle(false)}>个人主页</Text>
          </Link>
          <Link href="/setting">
            <Text>个人设置</Text>
          </Link>
          <Text onClick={() => signOut()}>退出</Text>
        </VStack>
      )}
    </Box>
  );
}
