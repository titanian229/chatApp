import React, { useEffect, useState } from "react";

import { socket } from "../socket";
import { messageEvent } from "../../../types";

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

  // On load get message state, attach socket listener for new messages
  useEffect(() => {
    getMessages(setMessages);

    socket.on("message", (message) => {
      setMessages((state) => [...state, message]);
    });
  }, []);

  return (
    <div>
      <h4>Messages</h4>
      <ul>
        {messages.map((message) => (
          <li key={message.sendTime}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
}
