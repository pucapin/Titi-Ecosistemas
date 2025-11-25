const { getGamesDB, getGameByChildDB } = require("../db/games.db");
const { emitEvent } = require("../services/socket.service");

const getGames = async (req, res) => {
  try {
    const data = await getGamesDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getGameByChild = async (req, res) => {
  try {
    const data = await getGameByChildDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const startGame = async (req, res) => {
  try {
    console.log("Game started");
    await emitEvent("startGame", {});
    res.json({ ok: true, message: "Game started" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

async function changeStation(req, res) {
  try {
    const { station } = req.body;

    if (!station) {
      return res.status(400).json({ error: "Missing station" });
    }

    await emitEvent("change-station", { station });

    res.json({ ok: true, station });
  } catch (err) {
    console.error("Error changing station:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { 
    getGames,
    getGameByChild,
    startGame,
    changeStation
};
