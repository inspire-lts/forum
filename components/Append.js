import { Text, VStack, HStack, Divider } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { format } from "timeago.js";
// import { MDXRemote } from "next-mdx-remote";
// import MDXComponents from "./MDXComponent";
// import { serialize } from "next-mdx-remote/serialize";

export default function Append({ postId }) {
  const { data } = useSWR(`/api/append/${postId}`, fetcher);

  return (
    <VStack w="100%">
      {data?.map((append, index) => {
        return (
          <VStack w="100%" alignItems={"flex-start"} px={2} key={index}>
            <HStack>
              <Text color="gray.400">第{index + 1}条附言</Text>
              <Text color="gray.400">{format(append.createdAt, "zh_CN")}</Text>
            </HStack>
            {/* todo: render markdown */}
            <Text>{append.content}</Text>
            <Divider />
          </VStack>
        );
      })}
    </VStack>
  );
}
