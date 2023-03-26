import React, { useEffect, useState } from "react";
import classes from "./Chat.module.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "../../features/user/appSlice";
import db from "../authentication/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { selectUser } from "../../features/user/userSlice";

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      const colRef = collection(db, "channels", channelId, "messages");
      const q = query(colRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [channelId]);
  const sendMessage = (e) => {
    e.preventDefault();
    const colRef = collection(db, "channels", channelId, "messages");
    addDoc(colRef, {
      timestamp: serverTimestamp(),
      message: input,
      user,
    });
    setInput("");
  };

  return (
    <div className={classes.chat}>
      <ChatHeader channelName={channelName} />

      <div className={classes[`chat__messages`]}>
        {messages.map((message) => (
          <Message
            key={Math.random(20000)}
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>
      <div className={classes[`chat__input`]}>
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Message #${channelName}`}
          />
          <button
            type="submit"
            disabled={!channelId}
            className={classes[`chat__inputButton`]}
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className={classes[`chat__inputIcons`]}>
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
