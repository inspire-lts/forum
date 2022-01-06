import Header from "./header";
import Footer from "./footer";
import { Container, Divider, Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Box>
      <Container maxW="container.lg">
        <Header />
        <Divider />
        {children}
        <Divider />
        <Footer />
      </Container>
    </Box>
  );
}
