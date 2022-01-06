import {
  Container,
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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import PostList from "../components/PostList";

export default function DashBoard() {
  const { data: session } = useSession();
  const { data } = useSWR("/api/selfPost", fetcher);
  return (
    <VStack p={2} alignItems="flex-start">
      <HStack>
        <Avatar src={session?.user.image} />
        <Box>
          <Text>{session?.user.name}</Text>
          <Text>{session?.user.email}</Text>
        </Box>
      </HStack>
      <Divider pb={2} />
      <Tabs variant="enclosed" w="100%">
        <TabList>
          <Tab>创建的主题</Tab>
          <Tab>收藏的主题</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              {data?.map((post) => {
                return <PostList post={post} key={post.id} />;
              })}
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
