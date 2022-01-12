import { Divider, Text, VStack } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import PostComment from "../../components/PostComment";
import PostContent from "../../components/PostContent";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function PostItem({ post, content, id }) {
  const { data } = useSWR(`/api/post/${id}`, fetcher);
  return (
    <VStack>
      <PostContent post={data} content={content} />
      <PostComment post={data} />
    </VStack>
  );
}

export async function getStaticPaths() {
  const posts = await prisma.post.findMany();
  const paths = posts.map((post) => ({
    params: {
      slug: post.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
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
