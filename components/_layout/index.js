import Header from "./header";
import Footer from "./footer";
import { Container, Divider } from "@chakra-ui/react";


export default function Layout({children}) {
  return (
    <Container
      maxW="container.lg">
        <Header/>
        <Divider/>
        {children}
        <Divider/>
        <Footer/>
    </Container>
  )
}