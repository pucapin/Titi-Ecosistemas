const { getStationsDB } = require('../db/stations.db');

const getStations = async (req, res) => {
  try {
    const data = await getStationsDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStations };
