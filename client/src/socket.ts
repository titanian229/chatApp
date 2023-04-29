import { io, Socket } from "socket.io-client";

export type ServerResponse = {
  success: boolean;
};

// export type uuidType = `${string}-${string}-${string}-${string}-${string}`;
export type uuidType = string;

export interface connectedUserData {
  [key: uuidType]: {
    socketID?: string;
    connectedTime: number;
    connected: boolean;
  };
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  connectedUsers: (connectedUsers: connectedUserData) => void;
  systemMessage: (message: string, callback: () => void) => void;
}

export interface ClientToServerEvents {
  initialize: (clientID: uuidType, callback: (e: number) => void) => void;
  getConnectedUsers: (callback: (e: number) => void) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3001";
// TODO: Set this to relative for dev mode and proxy it in vite config
const URL = "http://localhost:3003/ws";
// TODO: Set to relative

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3003", { path: "/ws" });
