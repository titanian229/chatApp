import path from "path";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import crypto from "crypto";

import {
  uuidType,
  connectedUserData,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
  // res.sendFile(__dirname + '/index.html');
});

const connectedUserData: connectedUserData = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("initialize", (clientID, callback) => {
    console.log("Init connection", clientID);
    socket.data.id = clientID;

    if (connectedUserData[clientID]) {
      connectedUserData[clientID].connected = true;
      connectedUserData[clientID].socketID = socket.id;
      return;
    }

    connectedUserData[clientID] = {
      socketID: socket.id,
      connectedTime: Date.now(),
      connected: true,
    };

    callback(1);
  });

  socket.on("getConnectedUsers", () => {
    socket.emit("connectedUsers", connectedUserData);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    if (socket.data.id) {
      connectedUserData[socket.data.id].connected = false;
      delete connectedUserData[socket.data.id].socketID;
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
