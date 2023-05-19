import React from "react";
import pic from "../assets/ayo-ogunseinde-sibVwORYqs0-unsplash.jpg";
import styles from "../styles/chat.module.scss";
import { Link } from "react-router-dom";

const data = [
  {
    img: pic,
    id: 1,
    userName: "raghav",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    timestamp: "2:45 pm",
  },
  {
    img: pic,
    id: 2,
    userName: "ram",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    timestamp: "2:45 pm",
  },
  {
    img: pic,
    id: 3,
    userName: "vinay",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    timestamp: "2:45 pm",
  },
  {
    img: pic,
    id: 4,
    userName: "james",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    timestamp: "2:45 pm",
  },
  {
    img: pic,
    id: 5,
    userName: "john",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    timestamp: "2:45 pm",
  },
];

const Chat = () => {
  return (
    <>
      <div>Stories</div>
      <div>Search box</div>
      {data.map((chat) => {
        return (
          <div className={styles.contact__container}>
            <div className={styles.img__container}>
              <img src={chat.img} alt="img" className={styles.chatimg} />
            </div>
            <div className={styles.content__container}>
              {/* <Link to={`/chat/${chat.id}`}> */}
              <p className="name">{chat.userName}</p>
              {/* </Link> */}
              <p className="message">{`${chat.message.substring(0, 30)}...`}</p>
            </div>
            <div className={styles.timestamp__container}>{chat.timestamp}</div>
          </div>
        );
      })}
    </>
  );
};

export default Chat;
