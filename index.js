const express = require("express");
const path = require("path");
const { createServer } = require("http");

const usersRouter = require("./server/routes/users.router");
const screen1EventsRouter = require("./server/routes/screen1Events.router");
const { initSocketInstance } = require("./server/services/socket.service");

const PORT = 5050;

const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(express.json());
app.use("/game", express.static(path.join(__dirname, "game")));
app.use("/parent", express.static(path.join(__dirname, "parent")));
app.use("/child", express.static(path.join(__dirname, "child")));


// Routes
app.use("/", usersRouter);
app.use("/", screen1EventsRouter);

// Services
initSocketInstance(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

// Añadir todos los endpoints que se utilizarán con sus descripciones