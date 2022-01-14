import { Divider, Text, VStack, Box} from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import PostComment from "../../components/PostComment";
import PostContent from "../../components/PostContent";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function PostItem({ content, id }) {
  const { data, error } = useSWR(`/api/post/${id}`, fetcher);
  if (error) return <Box>服务器抽风了</Box>;
  if (!data)  return <Box>loading</Box>
  return (
    <VStack>
      <PostContent post={data} content={content} />
      <PostComment post={data} />
    </VStack>
  );
}

export async function getServerSideProps({ params }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      favoritedBy: true,
    },
  });
  return {
    props: {
      id: params.slug,
      post,
      content: await serialize(post?.content),
    },
  };
}
