import {
  VStack,
  Text,
  HStack,
  Avatar,
  Box,
  Divider,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  Button,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import fetcher from "../../lib/fetcher";
import PostList from "../../components/PostList";
import { useRouter } from "next/router";

export default function DashBoard({ id }) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (error) return <Box>服务器抽风了</Box>;
  if (!data || status === "loading") return <Box>loading</Box>;
  console.log(data, 222);
  return (
    <VStack p={2} alignItems="flex-start">
      <HStack>
        <Avatar src={data.image} />
        <Box>
          <Text>{data.name}</Text>
          <Text>{data.email}</Text>
        </Box>
      </HStack>
      {session?.user.email === data.email && (
        <Button
          onClick={() => router.push("/setting")}
          my="4"
          variant="outline"
          variantColor="primary"
        >
          设置
        </Button>
      )}

      <Divider pb={2} />
      <Tabs variant="enclosed" w="100%">
        <TabList>
          <Tab>创建的主题</Tab>
          <Tab>收藏的主题</Tab>
          <Tab>关注者</Tab>
          <Tab>粉丝</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              {data?.posts?.map((post) => {
                return <PostList post={post} key={post.id} />;
              })}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {data?.favorites?.map((post) => {
                return <PostList post={post} key={post.id} />;
              })}
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.slug,
    },
  };
}
