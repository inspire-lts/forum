import { VStack, Text, Button, Container, Box } from "@chakra-ui/react";
import { useState } from "react";
import prisma from "../../lib/prisma";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Append({ postId }) {
  const [content, setContent] = useState("附言内容");
  const { mutate } = useSWRConfig()
  const router = useRouter()

  const submitAppend = async () => {
    await fetch(`/api/append/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    })
    mutate(`/api/post/${postId}`)
    router.push(`/post/${postId}`)
  }
  return (
    <VStack p={2} alignItems={"flex-start"} spacing={5}>
      <Text fontWeight={"bold"}>附言内容</Text>
      <Container maxW="container.md">
        <MDEditor value={content} onChange={setContent} />
        <Button size={"sm"} mt={2} onClick={submitAppend}>
          发表附言
        </Button>
      </Container>
      <VStack alignItems={"flex-start"}>
        <Text color={"gray.300"} fontSize={"sm"}>
          关于为主题创建附言
        </Text>
        <Text fontSize={"sm"}>
          请在确有必要的情况下再使用此功能为原主题补充信息
        </Text>
        <Text fontSize={"sm"}>每个主题至多可以附加 3 条附言</Text>
      </VStack>
    </VStack>
  );
}


export async function getServerSideProps({ params }) {
  const id = params.slug
  const post = await prisma.post.findUnique({
    where: {
      id
    }
  })
  
  return {
    props: {
      postId: id,
    },
  };
}
