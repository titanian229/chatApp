import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3001";
// TODO: Set this to relative for dev mode and proxy it in vite config
// const URL = "http://localhost:3003/ws";
// TODO: Set to relative

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({ path: "/ws" });
