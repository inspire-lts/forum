import { VStack, Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import PostComment from "../../components/PostComment";
import PostContent from "../../components/PostContent";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { unique } from "../../lib/utils";

export default function PostItem({ content, id }) {
  const { data, error } = useSWR(`/api/post/${id}`, fetcher);
  const { data: session, status } = useSession();
  if (error) return <Box>服务器抽风了</Box>;
  if (!data || status === "loading") return <Box>loading</Box>;
  const commentMember = data.comment.map((member) => ({
    name: member.author.name,
    id: member.author.id,
  }));
  const joinMember = [
    { name: data.author.name, id: data.author.id },
    ...commentMember,
  ];

  return (
    <VStack>
      <PostContent post={data} content={content} session={session} />
      <PostComment post={data} member={unique(joinMember, "id")} />
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
