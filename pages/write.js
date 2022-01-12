import {
  Container,
  HStack,
  Box,
  Text,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
const myCategory = [
  { value: "JS" },
  { value: "JAVA" },
  { value: "电影" },
  { value: "找工作" },
];

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("请注意，帖子一旦发表不可以删除");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleSubmit = async () => {
    const formData = { title, content, category };
    await fetch("/api/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    mutate("/api/write");
    router.push("/");
  };
  return (
    <Box py={5}>
      <Text mb={8}>创建新的主题</Text>
      <Container maxW="container.md">
        <Input
          placeholder="标题"
          mb={4}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MDEditor value={content} onChange={setContent} />
        <Select
          placeholder="选择分类"
          mt={5}
          onChange={(e) => setCategory(e.target.value)}
        >
          {myCategory.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.value}
              </option>
            );
          })}
        </Select>
        <Button mt={2} size="sm" onClick={(_) => handleSubmit()}>
          提交
        </Button>
      </Container>
    </Box>
  );
}
