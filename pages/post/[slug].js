import { Divider, Text, VStack } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import PostComment from "../../components/PostComment";
import PostContent from "../../components/PostContent";

export default function PostItem({ post, content }) {
  return (
    <VStack>
      <PostContent post={post} content={content} />
      <PostComment post={post} />
    </VStack>
  );
}

export async function getStaticPaths() {
  const posts = await prisma.post.findMany();
  const paths = posts.map((post) => ({
    params: {
      slug: post.title,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await prisma.post.findMany({
    where: {
      title: params.slug,
    },
  });
  return {
    props: {
      post,
      content: await serialize(post[0].content),
    },
  };
}
