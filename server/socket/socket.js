import { Server, Socket } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = [];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  userSocketMap.push(userId);

  io.emit("getOnlineUsers", userSocketMap);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    const newUserSocketMap = userSocketMap.filter((id) => id !== userId);
    io.emit("getOnlineUsers", newUserSocketMap);
  });
});

export { app, io, server };
