import {
  Box,
  Button,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
  VStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import Link from "next/link";
import { Search2Icon } from "@chakra-ui/icons";
import { useSession, signIn } from "next-auth/react";
import SwitchMode from "../SwitchMode";
import AvatarMenu from "../AvatarMenu";
import { useState } from "react";
import PostList from "../PostList";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  const { data, error } = useSWR("/api/post", fetcher);
  const [searchValue, setSearchValue] = useState("");

  if (status === "loading" || !data) {
    return <Text>loading</Text>;
  }

  if (error) {
    return <Text>服务器抽风了</Text>
  }
  const filterPosts = data.filter((post) => {
    if (!searchValue) return null
    return post.title.toUpperCase().includes(searchValue.toUpperCase());
  });
  
  return (
    <HStack justifyContent="space-between" p={2}>
      <Link href="/">
        <Text fontWeight="bold" fontSize="2xl" _hover={{ cursor: "pointer" }}>
          V3EX
        </Text>
      </Link>
      <Search2Icon onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"xl"}>帖子</ModalHeader>
          <ModalBody>
            <VStack spacing={5}>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索帖子"
              />
              {filterPosts.map((post) => {
                return <PostList post={post} key={post.id} />;
              })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
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
