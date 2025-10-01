const express = require("express");
const {
getGames,
getGameByChild
} = require("../controllers/games.controller");
const router = express.Router();


router.get("/", getGames);  // GET /games
router.get("/:child_id", getGameByChild);  // GET /games/:child_id

module.exports = router;
