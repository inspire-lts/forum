import { Text, VStack, Button, Divider, useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import Comment from "./Comment";
import AtDialog from "./AtDialog";
import styles from "./PostComment.module.css";

// 获取光标位置
const getCursorIndex = () => {
  const selection = window.getSelection();
  return selection?.focusOffset;
};

const getRangeNode = () => {
  const selection = window.getSelection();
  return selection?.focusNode;
};

const getRangeRect = () => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const rect = range.getClientRects()[0];
  const LINE_HEIGHT = 30;
  return {
    x: rect.x,
    y: rect.y + LINE_HEIGHT,
  };
};

// 是否展示 @
const showAt = () => {
  const node = getRangeNode();
  if (!node || node.nodeType !== Node.TEXT_NODE) return false;
  const content = node.textContent || "";
  const regx = /@([^@\s]*)$/;
  const match = regx.exec(content.slice(0, getCursorIndex()));
  return match && match.length === 2;
};

// 获取 @ 用户
const getAtUser = () => {
  const content = getRangeNode()?.textContent || "";
  const regx = /@([^@\s]*)$/;
  const match = regx.exec(content.slice(0, getCursorIndex()));
  if (match && match.length === 2) {
    return match[1];
  }
  return undefined;
};

const createAtButton = (user) => {
  const btn = document.createElement("button");
  btn.style.display = "inline-block";
  btn.dataset.user = JSON.stringify(user);
  btn.className = styles.at;
  btn.contentEditable = "false";
  btn.textContent = `@${user.name}`;
  const wrapper = document.createElement("a");
  wrapper.style.display = "inline-block";
  wrapper.contentEditable = "false";
  wrapper.href = `/dashboard/${user.id}`;
  const spaceElem = document.createElement("span");
  spaceElem.style.whiteSpace = "pre";
  spaceElem.textContent = "\u200b";
  spaceElem.contentEditable = "false";
  //const clonedSpaceElem = spaceElem.cloneNode(true);
  wrapper.appendChild(spaceElem);
  wrapper.appendChild(btn);
  // wrapper.appendChild(clonedSpaceElem);
  return wrapper;
};

const replaceString = (raw, replacer) => {
  return raw.replace(/@([^@\s]*)$/, replacer);
};

const replaceAtUser = (user) => {
  const node = getRangeNode();
  if (node) {
    const content = node?.textContent || "";
    const endIndex = getCursorIndex();
    const preSlice = replaceString(content.slice(0, endIndex), "");
    const restSlice = content.slice(endIndex);
    const parentNode = node?.parentNode;
    const nextNode = node?.nextSibling;
    const previousTextNode = document.createTextNode(preSlice);
    const nextTextNode = document.createTextNode("\u200b" + restSlice);
    const atButton = createAtButton(user);
    parentNode.removeChild(node);
    if (nextNode) {
      parentNode.insertBefore(previousTextNode, nextNode);
      parentNode.insertBefore(atButton, nextNode);
      parentNode.insertBefore(nextTextNode, nextNode);
    } else {
      parentNode.appendChild(previousTextNode);
      parentNode.appendChild(atButton);
      parentNode.appendChild(nextTextNode);
    }
    const range = new Range();
    range.setStart(nextTextNode, 0);
    range.setEnd(nextTextNode, 0);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

// 判断是否只有text node ==》@button有没有插入成功
const onlyText = (node) => {
  let flag = true;

  for (let i = 0; i < node.childNodes.length; i++) {
    const nodeType = node.childNodes[i].nodeType;
    if (nodeType !== 3) {
      flag = false;
      break;
    }
  }

  return flag;
};

export default function PostComment({ post, member }) {
  const textRef = useRef(null);
  const [queryString, setQueryString] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const { comment } = post;
  const postId = post?.id;
  const { data: session, status } = useSession();
  const { mutate } = useSWRConfig();
  const toast = useToast();

  if (status === "loading") {
    return <Text>loading</Text>;
  }

  const handleSubmit = async () => {
    const replay = [];
    const textHtml = textRef.current;
    let userId = undefined;

    for (let i = 0; i < textHtml.childNodes.length; i++) {
      const nodeType = textHtml.childNodes[i].nodeType;
      const nodeContent = textHtml.childNodes[i].textContent;
      if (nodeType === 1) {
        const user = textHtml.childNodes[i].childNodes[1].dataset.user;
        userId = JSON.parse(user);
        replay.push(user);
      } else if (nodeContent || nodeContent !== "​\u200b")
        replay.push(JSON.stringify(nodeContent));
    }

    if (!onlyText(textHtml)) {
      const userInfo = {
        informer: session.user.name,
        image: session.user.image,
        id: userId.id,
      };
      const formData = { postId: post.id, postTitle: post.title, userInfo };

      await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      await fetch(`/api/user/${userId.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ watching: false }),
      });
      mutate(`/api/email/${session.user.email}`)
    }

    if (!replay.length) {
      toast({
        title: "评论失败",
        description: "评论不能为空",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!session) {
      signIn();
    }
    await fetch(`/api/comment/${postId}`, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ replay }),
    });
    textRef.current.textContent = "";
    mutate(`/api/post/${postId}`);
  };

  const handleKeyUp = (e) => {
    if (showAt()) {
      const position = getRangeRect();
      setPosition(position);
      const user = getAtUser();
      setQueryString(user || "");
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  };

  const handleKeyDown = (e) => {
    if (showDialog) {
      if (
        e.code === "ArrowUp" ||
        e.code === "ArrowDown" ||
        e.code === "Enter"
      ) {
        e.preventDefault();
      }
    }
  };

  const handlePickUser = (user) => {
    replaceAtUser(user);
    setShowDialog(false);
  };

  const handleHide = () => {
    setShowDialog(false);
  };

  const handleShow = () => {
    setShowDialog(true);
  };
  return (
    <VStack p={2} w="80%" border="1px" borderRadius="5px">
      <VStack w="100%">
        <Text>回复主题</Text>
        <Text
          ref={textRef}
          h={"40px"}
          suppressContentEditableWarning
          contentEditable
          w={"100%"}
          border={"1px"}
          borderColor={"gray.300"}
          borderRadius={"5px"}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          px={2}
          textAlign={"left"}
          lineHeight={"35px"}
          _empty={{
            _before: {
              content: { base: '"友善发表自己的意见哦~"' },
              color: "gray.500",
            },
          }}
          _focus={{
            _before: {
              content: { base: "none" },
            },
          }}
        ></Text>
        <AtDialog
          member={member}
          visible={showDialog}
          position={position}
          queryString={queryString}
          onPickUser={handlePickUser}
          onHide={handleHide}
          onShow={handleShow}
        />
        <Button onClick={handleSubmit} size="xs">
          发布回复
        </Button>
      </VStack>
      <Divider />
      {comment?.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            authorId={post.authorId}
          />
        );
      })}
    </VStack>
  );
}
