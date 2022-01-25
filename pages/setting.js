import { Box, Button, Container, Input, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../lib/fetcher";

export default function Setting() {
  const router = useRouter()
  const { data: session, status } = useSession();
  const { data: user, error } = useSWR(
    `/api/email/${session?.user?.email}`,
    fetcher
  );
  const { mutate} = useSWRConfig()
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);

  if (status === "loading" || !user) {
    return <Text>loading23333</Text>;
  }
  if (error) {
    return <Text>服务器抽风了</Text>;
  }

  const updateUser = async () => {
    const formData = { name, bio };
    await fetch(`/api/user/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    mutate(`/api/user/${user.id}`)
    router.push(`/dashboard/${user.id}`)
  };
  return (
    <Container
      border={"1px"}
      borderColor={"gray.200"}
      my={2}
      borderRadius={"5px"}
      p={3}
    >
      {user && (
        <Box>
          <Text>昵称</Text>
          <Input
            placeholder={user.name}
            onChange={(e) => setName(e.target.value)}
          />
          <Text mt={2}>说一句话吧</Text>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} />
          <Text mt={2}>邮箱</Text>
          <Input disabled placeholder={user.email} />
          <Button onClick={updateUser} mt={4}>
            提交
          </Button>
        </Box>
      )}
    </Container>
  );
}
