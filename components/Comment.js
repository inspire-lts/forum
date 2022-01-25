import { Avatar, HStack, Text, VStack, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { format } from "timeago.js";


export default function Comment({ comment, authorId }) {
  const { author } = comment;

  return (
    <VStack alignItems="flex-start" w="80%" px={1}>
      <HStack px={0}>
        <Avatar src={author?.image} size="sm" />
        <Box>
          <HStack>
            <Link href={`/dashboard/${comment.authorId}`}>
              <Text color="gray.400" _hover={{ cursor: "pointer" }}>
                {author?.name}
              </Text>
            </Link>
            {comment.authorId === authorId && (
              <Text
                color="blue.300"
                border="1px"
                px={0.5}
                borderRadius="2px"
                fontSize="xs"
              >
                OP
              </Text>
            )}
          </HStack>
          <Text color="gray.400">{format(comment.createdAt, "zh_CN")}</Text>
        </Box>
      </HStack>
      <HStack justifyContent={"flex-start"} spacing={0}>
        {comment?.content?.map((item) => {
          const parseItem = JSON.parse(item);
          return typeof parseItem === "object" ? (
            <a href={`/dashboard/${parseItem?.id}`} key={parseItem.id}>
              <Text
                border={"1px"}
                borderColor={"black"}
                display={"inline"}
                borderRadius={"13px"}
                px={"4px"}
                mx={"4px"}
              >{`@${parseItem.name}`}</Text>
            </a>
          ) : (
            <Text key={parseItem}>{parseItem}</Text>
          );
        })}
      </HStack>
      <Divider />
    </VStack>
  );
}
