import NextLink from "next/link";
import NextImage from "next/image";
import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Kbd,
  UnorderedList,
  OrderedList,
  Alert,
  AlertIcon,
  ListItem,
  Link,
  useColorModeValue,
  useColorMode,
  Container,
  Button
} from "@chakra-ui/react";
import { PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import { atomDark, prism  } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyToClipboard from "react-copy-to-clipboard";


const Image = (props) => {
  return (
    <Box mt={4} rounded="lg" shadow="sm" overflow="hidden" lineHeight={0}>
      <NextImage {...props} />
    </Box>
  );
};

const BlockQuote = ({ children }) => {
  return (
    <Alert
      mt="4"
      status="info"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
    >
      <AlertIcon />
      {children.props.children}
    </Alert>
  );
};

const CustomLink = (props) => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={useColorModeValue("blue.500", "blue.200")} {...props} />
      </NextLink>
    );
  }

  return (
    <Link
      color={useColorModeValue("blue.500", "blue.200")}
      isExternal
      {...props}
    />
  );
};

const MDXComponents =() =>{
  const [isCopied, setIsCopied] = useState(false)
  const {colorMode} = useColorMode()

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 2000)
  
    return () => clearTimeout(timer)
  }, [isCopied])
  

  return (
    {
      h1: (props) => <Heading fontWeight="bold" fontWeight="normal" as="h2" size="xl" my="15px" {...props} />,
      h2: (props) => <Heading fontWeight="bold" as="h3" size="lg" my="15px" {...props} />,
      h3: (props) => <Heading fontWeight="bold" as="h4" size="md" my="15px" {...props} />,
      h4: (props) => <Heading fontWeight="bold" as="h5" size="sm" my="15px" {...props} />,
      strong: (props) => <Text as="strong" fontWeight="bold" {...props} />,
      code: (props) => {
  
        return (
          <Container position="relative">
            <Text bg="orange"  position="absolute" top="-8px" left="30px">{props.className}</Text>
            <CopyToClipboard 
              text={props.children}
              onCopy={() => setIsCopied(true)}>
              <Button 
                size="xs"
                top="-8px"
                position="absolute"
                right="40px"
                color={colorMode === "light" ? "black" : "white"}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
            </CopyToClipboard>
            <SyntaxHighlighter language="javascript" style={colorMode === "dark" ? atomDark : prism} >
              {props.children}
            </SyntaxHighlighter>
          </Container>
        )

      },
      kbd: Kbd,
      blockquote: BlockQuote,
      p: (props) => <Text as="p" my="15px" {...props} />,
      ul: (props) => <UnorderedList {...props} ml="20px" />,
      ol: (props) => <OrderedList {...props} ml="20px" />,
      li: (props) => <ListItem m="2px" {...props} />,
      a: CustomLink,
      Image,
    }
  )
} 

export default MDXComponents;
