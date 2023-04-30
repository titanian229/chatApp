import { useContext, useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";

import { socket } from "../socket";
import { messageEvent } from "../../../types";
import UserIcon from "./UserIcon";
import { UserContext } from "../contexts/WebSocketContext";

const getMessages = (setMessageState: (newState: messageEvent[]) => void) => {
  fetch("/api/messages")
    .then((response) => response.json())
    .then((data) => {
      setMessageState(data);
    });
};

// Use connected users to keep track of Avatars, to show avatar for current user and all other connected users

export default function Messages() {
  const [messages, setMessages] = useState<messageEvent[]>([]);
  const connectedUsers = useContext(UserContext);

  // On load get message state, attach socket listener for new messages
  useEffect(() => {
    getMessages(setMessages);

    const onMessage = (message: messageEvent) => {
      setMessages((state) => [message, ...state]);
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, []);

  return (
    <div className="scroll-custom">
      {/* TODO: Message from user on opposite side or with diff background */}
      <Paper
        elevation={24}
        sx={{
          margin: "1rem",
          marginTop: "0.5rem",
          padding: "0.25rem",
          height: "60vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
        className="scroll-custom"
      >
        {messages.map((message) => (
          <div key={message.sendTime} style={{ display: "flex", alignItems: "center", margin: "0.25rem 0" }}>
            <UserIcon
              svgString={connectedUsers[message.sender.id] ? connectedUsers[message.sender.id].icon : undefined}
            />
            <Typography variant="body1" component="span" style={{ marginLeft: "1em", wordBreak: "break-all" }}>
              {message.message}
            </Typography>
          </div>
          // <li key={message.sendTime}>{message.message}</li>
        ))}
      </Paper>
    </div>
  );
}
