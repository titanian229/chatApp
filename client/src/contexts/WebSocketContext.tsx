import React, { createContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { socket } from "../socket";
import { newUser, uuidType } from "../../../types";

interface websocketContextState {
  isConnected: boolean;
  numberConnectedUsers: number;
  myIcon?: string;
}

const defaultState: websocketContextState = {
  isConnected: false,
  numberConnectedUsers: 0,
};

type userContextState = {
  [key: uuidType]: {
    icon: string;
  };
};

export const UserContext = createContext<userContextState>({});

export const WebSocketContext = createContext<websocketContextState>(defaultState);

// Context holds the connected state, as well as handlers for dispatching messages and system messages.  It creates and assigns the user ID.
export default function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState<websocketContextState>(defaultState);
  const [connectedUsers, setConnectedUsers] = useState<userContextState>({});

  useEffect(() => {
    const onConnect = () => {
      setIsConnected({
        isConnected: true,
        numberConnectedUsers: 0,
      });
      // const localClientID = localStorage.getItem("clientID");
      // let clientID: uuidType;
      // if (localClientID) {
      //   clientID = localClientID;
      // } else {
      //   clientID = uuidv4();
      //   localStorage.setItem("clientID", clientID);
      // }

      socket.emit("initialize", uuidv4(), ({ myIcon, connectedUserNumber, connectedUsers }) => {
        setIsConnected((state) => ({
          ...state,
          numberConnectedUsers: connectedUserNumber,
          myIcon: myIcon,
        }));
        console.log({ connectedUsers });
        setConnectedUsers(
          connectedUsers.reduce((prev: userContextState, curr: newUser) => {
            prev[curr.id] = { icon: curr.icon };
            return prev;
          }, {})
        );
      });
    };

    const onDisconnect = () => {
      setIsConnected(defaultState);
      setConnectedUsers({});
    };

    const onSystemMessage = (message: string) => {
      console.log(message);
    };

    const onNewUser = (newUser: newUser) => {
      setConnectedUsers((state) => {
        return {
          ...state,
          [newUser.id]: { icon: newUser.icon },
        };
      });
    };

    const onDisconnectedUser = (disconnectedUserID: uuidType) => {
      setConnectedUsers((state) => {
        const newState = { ...state };
        delete newState[disconnectedUserID];
        return newState;
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("systemMessage", onSystemMessage);
    socket.on("newUser", onNewUser);
    socket.on("disconnectedUser", onDisconnectedUser);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("systemMessage", onSystemMessage);
      socket.off("newUser", onNewUser);
      socket.off("disconnectedUser", onDisconnectedUser);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={isConnected}>
      <UserContext.Provider value={connectedUsers}>{children}</UserContext.Provider>
    </WebSocketContext.Provider>
  );
}
