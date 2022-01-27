import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import { Box, VStack } from "@chakra-ui/react";
import fetcher from "../../lib/fetcher";
import NotificationItem from "../../components/NotificationItem";
import { useEffect } from "react";

export default function DashBoard({ id }) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher);
  const { data: session, status } = useSession();
  const { mutate } = useSWRConfig();
  useEffect(async () => {
    await fetch(`/api/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watching: true }),
    });
    mutate(`/api/email/${session?.user?.email}`);
  }, []);
  if (error) return <Box>服务器抽风了</Box>;
  if (!data) return <Box>loading</Box>;

  return (
    <VStack spacing={2} p={4}>
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
