import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat = (props) => {
  const chatMessagesRef = useRef(null);
  const [msgText, setMsgText] = useState("");
  const user = localStorage.getItem("user");

  const sendMessage = (e) => {
    try {
      e.preventDefault();
      const roomID = props.roomID;
      if (msgText) {
        props.socket.current.emit("send-message", {
          roomID,
          from: props.socket.current.id,
          user: user,
          message: msgText.trim(),
        });
      }
      setMsgText("");
    } catch (error) {
      console.error("Error in sendMessage:", error);
    }
  };

  useEffect(() => {
    // Scroll down when new messages are added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [props.msgs]);

  return (
    <div className="chat_box">
      <div className="chat_messages" ref={chatMessagesRef}>
        {props.msgs.map((msg, index) => {
          return msg.send ? (
            <div className="chat_message user_message">
              <p className="user_text">{msg.data.message}</p>
            </div>
          ) : (
            <div key={index} className="chat_message">
              <p className="chat_user">{msg.data.user}</p>
              <p className="chat_text">{msg.data.message}</p>
            </div>
          );
        })}
      </div>
      <div className="chat_input">
        <input
          value={msgText}
          onChange={(e) => {
            setMsgText(e.target.value);
          }}
          type="text"
          placeholder="Type a message"
        />
        <IconButton onClick={sendMessage}>
          <SendIcon sx={{ color: "#6a35f6" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
