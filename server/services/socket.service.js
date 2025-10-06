// server/services/socket.service.js
const { Server } = require("socket.io");
let io;

const initSocketInstance = (httpServer) => {
  io = new Server(httpServer, {
    path: "/real-time",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ a user connected:", socket.id);

    socket.on("acc", (acc) => {
      console.log("acceleration data:", acc);
      // Example: broadcast to others if needed
      // socket.broadcast.emit("acc-update", acc);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
};

const emitEvent = (eventName, data) => {
  if (!io) {
    throw new Error("Socket.io instance is not initialized");
  }
  io.emit(eventName, data);
};

module.exports = {
  emitEvent,
  initSocketInstance,
};
