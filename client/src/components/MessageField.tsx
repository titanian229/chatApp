import React, { useState } from "react";

import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { socket } from "../socket";

const emitMessage = (message: string, setMessage: (message: string) => void) => {
  socket.emit("message", message);
  setMessage("");
};

export default function MessageField() {
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    emitMessage(message, setMessage);
  };

  const keyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  // useEffect(() => {

  // }, [])

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <TextField
        onKeyUp={keyPress}
        size="small"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        label="Message"
        variant="outlined"
        // fullWidth
        sx={{ marginLeft: "1rem", width: "100%" }}
      />
      <IconButton sx={{ marginLeft: "0.5rem" }} onClick={sendMessage}>
        <SendIcon />
      </IconButton>
    </div>
  );
}
