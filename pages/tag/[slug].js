import { VStack, Text, HStack } from "@chakra-ui/react";
import useSWR from "swr";
import PostList from "../../components/PostList";
import fetcher from "../../lib/fetcher";

export default function Tag({ category }) {
  const { data: posts, error } = useSWR(`/api/category/${category}`, fetcher);

  if (!posts) return <Text>loading</Text>;
  return (
    <VStack>
      <HStack justifyContent={"space-around"} w={"80%"}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          类别:{category}
        </Text>
        <Text>主题总数: {posts.length}</Text>
      </HStack>
      {posts.map((post) => {
        return <PostList post={post} key={post.id} />;
      })}
    </VStack>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      category: params.slug,
    },
  };
}
