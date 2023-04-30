import path from "path";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";

import {
  uuidType,
  connectedUserData,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  initializationResponse,
  newUser,
  messageEvent,
} from "../types";
import getRandomAvatar from "./getRandomAvatar";

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const server = http.createServer(app);

const ioServerConfig = {
  cors: {
    origin: process.env.NODE_ENV === "DEV" ? process.env.CLIENT_ADDRESS : undefined,
    methods: ["GET", "POST"],
  },
  path: "/ws",
};

console.log(ioServerConfig);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  server,
  ioServerConfig
);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
//   // res.sendFile(__dirname + '/index.html');
// });

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => res.sendFile("index.html", { root: path.join(__dirname, "../client/dist") }));

const connectedUserData: connectedUserData = {};

const messages: messageEvent[] = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("initialize", async (clientID, callback) => {
    console.log("Init connection", clientID);
    socket.data.id = clientID;

    if (connectedUserData[clientID]) {
      connectedUserData[clientID].connected = true;
      connectedUserData[clientID].socketID = socket.id;
    } else {
      // Create user's icon
      const svg = await getRandomAvatar(clientID);

      connectedUserData[clientID] = {
        socketID: socket.id,
        connectedTime: Date.now(),
        connected: true,
        icon: svg,
      };
    }

    // Emit the new connected user to all clients
    socket.broadcast.emit("newUser", { id: clientID, icon: connectedUserData[clientID].icon });

    callback({
      connectedUserNumber: Object.keys(connectedUserData)
        .map((key) => connectedUserData[key])
        .filter((user) => user.connected === true).length,
      connectedUsers: Object.keys(connectedUserData).map((key) => ({ id: key, icon: connectedUserData[key].icon })),
      myIcon: connectedUserData[clientID].icon,
    });
  });

  socket.on("getConnectedUsers", () => {
    socket.emit("connectedUsers", connectedUserData);
  });

  socket.on("message", (message: string) => {
    const id = socket.data.id;
    if (!id) return;
    const messageData = { message, sender: { id }, sendTime: Date.now() };
    messages.push(messageData);
    io.emit("message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    if (socket.data.id) {
      // connectedUserData[socket.data.id].connected = false;
      // delete connectedUserData[socket.data.id].socketID;
      delete connectedUserData[socket.data.id];
      socket.broadcast.emit("disconnectedUser", socket.data.id);
    }
  });
});

server.listen(process.env.PORT, () => {
  const address = server.address();
  if (address !== null && typeof address === "object" && "port" in address) {
    console.log(`listening on *:${address.port}`);
  } else {
    console.log(address);
  }
});
