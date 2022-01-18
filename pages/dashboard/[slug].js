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
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import fetcher from "../../lib/fetcher";
import PostList from "../../components/PostList";
import { useRouter } from "next/router";
import UserItem from "../../components/UserItem";

export default function DashBoard({ id }) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher);
  const { data: session, status } = useSession();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  if (error) return <Box>服务器抽风了</Box>;
  if (!data || status === "loading") return <Box>loading</Box>;
  // 用户主页的关注者没有本人
  const isAreayFollowing = !!data.followedBy.find(
    (f) => f.email === session.user.email
  );

  const toggleFollow = async () => {
    const operation = isAreayFollowing ? "disconnect" : "connect";
    await fetch(`/api/follow/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation }),
    });
    mutate(`/api/user/${id}`);
  };
  return (
    <VStack p={2} alignItems="flex-start">
      <HStack>
        <Avatar src={data.image} />
        <Box>
          <Text>{data.name}</Text>
          <Text>{data.email}</Text>
        </Box>
      </HStack>
      {session?.user.email === data.email ? (
        <Button
          onClick={() => router.push("/setting")}
          my="4"
          variant="outline"
        >
          设置
        </Button>
      ) : (
        <Button onClick={toggleFollow}>
          {isAreayFollowing ? "取消关注" : "关注"}
        </Button>
      )}

      <Divider pb={2} />
      <Tabs variant="enclosed" w="100%">
        <TabList>
          <Tab>创建的主题</Tab>
          <Tab>收藏的主题</Tab>
          <Tab>粉丝 {data.followedBy.length}</Tab>
          <Tab>关注 {data.following.length}</Tab>
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
            <VStack>
              {data.followedBy.map((follow) => {
                return <UserItem follow={follow} key={follow.id} />;
              })}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {data.following.map((follow) => {
                return <UserItem follow={follow} key={follow.id} />;
              })}
            </VStack>
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
