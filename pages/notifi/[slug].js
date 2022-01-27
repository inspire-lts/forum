import useSWR from "swr";
import { Box, VStack } from "@chakra-ui/react";
import fetcher from "../../lib/fetcher";
import NotificationItem from "../../components/NotificationItem";

export default function DashBoard({ id }) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher);
  if (error) return <Box>服务器抽风了</Box>;
  if (!data) return <Box>loading</Box>;
  console.log(data.notifications);
  return (
    <VStack spacing={2} p={4} >
      {data.notifications.map((notification) => {
        return (
          <NotificationItem notification={notification} key={notification.id} />
        );
      })}
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
