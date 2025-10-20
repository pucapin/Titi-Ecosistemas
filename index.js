const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { initSocketInstance } = require("./server/services/socket.service");


const childRouter = require("./server/routes/child.router");
const parentsRouter = require("./server/routes/parents.router");
const checkpointRouter = require("./server/routes/checkpoint.router");
const correctChildRouter = require("./server/routes/correct_child.router");
const gamesRouter = require("./server/routes/games.router");
const checkChildRouter = require("./server/routes/check_child.router");
const stationChildRouter = require("./server/routes/station_child.router");
const stationsRouter = require("./server/routes/stations.router");
const questionsRouter = require("./server/routes/questions.router");

const motionEventRouter = require("./server/routes/screen1Events.router");


const PORT = 5050;

const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(express.json());
app.use("/game", express.static(path.join(__dirname, "game")));
app.use("/parent", express.static(path.join(__dirname, "parent")));
app.use("/child", express.static(path.join(__dirname, "child")));
app.use("/assets", express.static(path.join(__dirname, "assets")));


// Routes
app.use("/checkpoint", checkpointRouter);
app.use("/questions", questionsRouter);
app.use("/child", childRouter);
//app.use("/parent", parentRouter);
app.use("/", correctChildRouter);
app.use("/", gamesRouter);
app.use("/", checkChildRouter);
app.use("/", stationChildRouter);
app.use("/", stationsRouter);
app.use("/", motionEventRouter);

// Services
initSocketInstance(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

