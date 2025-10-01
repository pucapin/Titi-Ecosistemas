const { getStationChildDB } = require('../db/station_child.db');

const getStationChild = async (req, res) => {
  try {
    const data = await getStationChildDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStationChild };
