import { useRef, useState, useEffect } from "react";
import styles from "./AtDialog.module.css";

const searchUser = (queryString, member) => {
  return queryString
    ? member.filter(({ name }) => name.startsWith(queryString))
    : member.slice(0);
};

export default function AtDialog(props) {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(-1);
  const usersRef = useRef();
  usersRef.current = users;
  const indexRef = useRef();
  indexRef.current = index;
  const visibleRef = useRef();
  visibleRef.current = props.visible;

  useEffect(() => {
    const filterdUsers = searchUser(props.queryString, props.member);
    setUsers(filterdUsers);
    setIndex(0);
    if (!filterdUsers.length) {
      props.onHide();
    }
  }, [props.queryString]);

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (visibleRef.current) {
        if (e.code === "Escape") {
          props.onHide();
          return;
        }
        if (e.code === "ArrowDown") {
          setIndex((oldIndex) => {
            return Math.min(oldIndex + 1, (usersRef.current?.length || 0) - 1);
          });
          return;
        }
        if (e.code === "ArrowUp") {
          setIndex((oldIndex) => Math.max(0, oldIndex - 1));
          return;
        }
        if (e.code === "Enter") {
          if (
            indexRef.current !== undefined &&
            usersRef.current?.[indexRef.current]
          ) {
            props.onPickUser(usersRef.current?.[indexRef.current]);
            setIndex(-1);
          }
          return;
        }
      }
    };
    document.addEventListener("keyup", keyDownHandler);
    return () => {
      document.removeEventListener("keyup", keyDownHandler);
    };
  }, []);
  return (
    <>
      {props.visible ? (
        <div
          style={{
            position: "fixed",
            top: props.position.y,
            left: props.position.x,
          }}
          className={styles.wrapper}
        >
          {users.length ? "" : "无搜索结果"}
          {users.map((user, i) => {
            return (
              <div
                key={user.id}
                className={i === index ? styles.itemActive : styles.item}
              >
                <div>{user.name}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
