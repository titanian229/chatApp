import React, { createContext, useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { socket, uuidType } from "../socket";

const WebSocketContext = createContext<boolean>(false);

export const useWebSocket = () => useContext(WebSocketContext);

// Context holds the connected state, as well as handlers for dispatching messages and system messages.  It creates and assigns the user ID.
export default function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      const localClientID = localStorage.getItem("clientID");
      let clientID: uuidType;
      if (localClientID) {
        clientID = localClientID;
      } else {
        clientID = uuidv4();
        localStorage.setItem("clientID", clientID);
      }

      socket.emit("initialize", clientID, (response) => console.log(response));
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onSystemMessage = (message: string) => {};
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("systemMessage", onSystemMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("systemMessage", onSystemMessage);
    };
  }, []);

  return <WebSocketContext.Provider value={isConnected}>{children}</WebSocketContext.Provider>;
}
