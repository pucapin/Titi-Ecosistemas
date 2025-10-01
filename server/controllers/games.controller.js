const { getGamesDB, getGameByChildDB } = require("../db/games.db");

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

module.exports = { 
    getGames,
    getGameByChild 
};
