import express from "express";
import { Server } from "socket.io";
import * as http from "http";

const app = express();
const PORT = 8000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// server-side
io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  // Listen for messages from clients
  socket.on("message", (data) => {
    console.log(`Received message from ${socket.id}: ${data}`);
    io.to(socket.id).emit(
      "reply",
      `Reply from server to ${socket.id}: ${data}`
    );
  });
});

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`);
  console.log(`🚀 WebSocket endpoint ready at ws://localhost:${PORT}`);
});
