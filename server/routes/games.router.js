const express = require("express");
const {
getGames,
getGameByChild,
startGame,
changeStation
} = require("../controllers/games.controller");
const router = express.Router();


router.get("/", getGames);  // GET /games
router.get("/:child_id", getGameByChild);  // GET /games/:child_id
router.post("/change", changeStation)
router.post("/start", startGame);  // POST /games/start

module.exports = router;
